"use client";

import React, { useState } from "react";

export default function OCRUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    setResult(null);
    if (f) setPreview(URL.createObjectURL(f));
  };

  const handleOCR = async () => {
    if (!file) return;
    setLoading(true);
    const fd = new FormData();
    fd.append('image', file);
    try {
      const res = await fetch('/api/ocr', { method: 'POST', body: fd });
      const json = await res.json();
      setResult(json);
    } catch (err) {
      console.error(err);
      alert('Error al procesar OCR');
    } finally {
      setLoading(false);
    }
  };

  const mappedCaudal = () => {
    if (!result?.parsed) return [];
    return result.parsed.map((row: string[]) => ({
      pressure: row[0] ?? null,
      rpm: row[1] ?? null,
      pulse: row[2] ?? null,
      normal: row[3] ?? null,
      plus: row[4] ?? null,
      real: row[5] ?? null,
    }));
  };

  const handleCreateInjector = async () => {
    if (!number) return alert('Introduce el número de parte');
    const caudalTables = mappedCaudal();
    try {
      const res = await fetch('/api/injectors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number, name, caudalTables })
      });
      const json = await res.json();
      if (res.ok) {
        alert('Inyector creado');
      } else {
        alert(JSON.stringify(json));
      }
    } catch (err) {
      console.error(err);
      alert('Error creando inyector');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Cargar imagen para OCR</h2>
      <input type="file" accept="image/*" onChange={onFile} />
      {preview && <div style={{ marginTop: 10 }}><img src={preview} alt="preview" style={{ maxWidth: '480px' }} /></div>}
      <div style={{ marginTop: 10 }}>
        <button onClick={handleOCR} disabled={!file || loading}>{loading ? 'Procesando...' : 'Ejecutar OCR'}</button>
      </div>

      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>Texto extraído</h3>
          <pre style={{ whiteSpace: 'pre-wrap', background: '#f5f5f5', padding: 10 }}>{result.text}</pre>

          <h3>Filas parseadas (heurística)</h3>
          <table style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ccc', padding: 6 }}>pressure</th>
                <th style={{ border: '1px solid #ccc', padding: 6 }}>rpm</th>
                <th style={{ border: '1px solid #ccc', padding: 6 }}>pulse</th>
                <th style={{ border: '1px solid #ccc', padding: 6 }}>normal</th>
                <th style={{ border: '1px solid #ccc', padding: 6 }}>+</th>
                <th style={{ border: '1px solid #ccc', padding: 6 }}>real</th>
              </tr>
            </thead>
            <tbody>
              {mappedCaudal().map((r: any, i: number) => (
                <tr key={i}>
                  <td style={{ border: '1px solid #ccc', padding: 6 }}>{r.pressure}</td>
                  <td style={{ border: '1px solid #ccc', padding: 6 }}>{r.rpm}</td>
                  <td style={{ border: '1px solid #ccc', padding: 6 }}>{r.pulse}</td>
                  <td style={{ border: '1px solid #ccc', padding: 6 }}>{r.normal}</td>
                  <td style={{ border: '1px solid #ccc', padding: 6 }}>{r.plus}</td>
                  <td style={{ border: '1px solid #ccc', padding: 6 }}>{r.real}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: 12 }}>
            <label>Número de parte (required): </label>
            <input value={number} onChange={(e) => setNumber(e.target.value)} />
          </div>
          <div style={{ marginTop: 6 }}>
            <label>Nombre / descripción: </label>
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div style={{ marginTop: 10 }}>
            <button onClick={handleCreateInjector}>Crear inyector con tabla</button>
          </div>
        </div>
      )}
    </div>
  );
}
