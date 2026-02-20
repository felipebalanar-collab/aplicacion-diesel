"use server";

import { prisma } from "@/lib/prisma";

import { revalidatePath } from "next/cache";

export async function searchInjectors(query: string, fuelType?: string, category?: string, family?: string) {
    console.log(`[searchInjectors] Called with: query="${query}", fuel="${fuelType}", cat="${category}", fam="${family}"`);
    
    if (!query && !fuelType && !category && !family) {
        console.log('[searchInjectors] All params empty, returning []');
        return [];
    }

    const normalizedQuery = query.replace(/[\s.-]/g, "");
    console.log(`[searchInjectors] Normalized query: "${normalizedQuery}"`);

    try {
        // Use Prisma findMany instead of raw query
        const allInjectors = await prisma.injector.findMany();
        console.log(`[searchInjectors] Total injectors from DB: ${allInjectors.length}`);

        const filtered = allInjectors.filter(inj => {
            const injFuel = (inj.fuelType || "").toLowerCase().trim();
            const injCat = (inj.category || "").toLowerCase().trim();
            const injBrand = (inj.brand || "").toLowerCase().trim();
            const injFam = (inj.family || "").toLowerCase().trim();

            const targetFuel = fuelType?.toLowerCase().trim();
            const targetCat = category?.toLowerCase().trim();
            const targetBrand = family?.toLowerCase().trim();

            // String search
            const matchesQuery = !query || [
                inj.number,
                inj.family,
                inj.brand,
                inj.vehicles,
                inj.similarParts
            ].some(field => {
                if (!field) return false;
                const f = field.toLowerCase();
                const q = query.toLowerCase();
                return f.includes(q) || f.replace(/[\s.-]/g, "").includes(normalizedQuery);
            });

            // Hierarchical filters
            const matchesFuel = !targetFuel || injFuel === targetFuel;
            const matchesCategory = !targetCat || injCat === targetCat;
            const matchesBrand = !targetBrand || injBrand === targetBrand;

            return matchesQuery && matchesFuel && matchesCategory && matchesBrand;
        });
        
        console.log(`[searchInjectors] Found ${filtered.length} matching results`);
        return filtered;
    } catch (err) {
        console.error('[searchInjectors] Error:', err);
        return [];
    }
}

export async function getFamilies(fuelType: string, category: string) {
    revalidatePath("/");
    console.log(`[getFamilies] Querying for: ${fuelType} > ${category}`);
    const all = await prisma.injector.findMany();

    const targetFuel = fuelType.toLowerCase().trim();
    const targetCat = category.toLowerCase().trim();

    const families = all
        .filter(inj => {
            const injFuel = (inj.fuelType || "").toLowerCase().trim();
            const injCat = (inj.category || "").toLowerCase().trim();
            // Robust matching for "inyector" vs "inyectores"
            const categoryMatch = injCat === targetCat ||
                (targetCat.startsWith(injCat) && injCat.length > 3) ||
                (injCat.startsWith(targetCat) && targetCat.length > 3);
            return (injFuel === targetFuel || (targetFuel === 'gasoline' && injFuel === 'gasolina')) && categoryMatch;
        })
        .map(inj => inj.family)
        .filter(Boolean);

    const results = Array.from(new Set(families)).sort();
    console.log(`[getFamilies] Results:`, results);
    return results;
}

export async function saveInjector(data: any) {
    const { id, testPlans, caudalTables, ...injectorData } = data;

    let injector;
    if (id) {
        // Update existing
        injector = await prisma.injector.update({
            where: { id },
            data: {
                ...injectorData,
                testPlans: {
                    deleteMany: {},
                    create: testPlans.map((tp: any) => ({ ...tp, id: undefined }))
                },
                caudalTables: {
                    deleteMany: {},
                    create: caudalTables.map((ct: any) => ({ ...ct, id: undefined }))
                }
            }
        });
    } else {
        // Create new
        injector = await prisma.injector.create({
            data: {
                ...injectorData,
                testPlans: {
                    create: testPlans
                },
                caudalTables: {
                    create: caudalTables
                }
            }
        });
    }

    revalidatePath("/admin");
    revalidatePath(`/injectors/${injector.number}`);
    return injector;
}

export async function deleteInjector(id: string) {
    await prisma.testPlan.deleteMany({ where: { injectorId: id } });
    await prisma.caudalTable.deleteMany({ where: { injectorId: id } });
    await prisma.injector.delete({ where: { id } });
    revalidatePath("/admin");
}
