import pdf from '../models/pdfs.js';

/**
 * Obtiene todos los años únicos que existen en la base de datos
 * @returns {Promise<Array<number>>} Array de años únicos ordenados
 */
export const getExistingYears = async () => {
    try {
        const years = await pdf.aggregate([
            {
                $group: {
                    _id: { $year: "$publicationDate" }
                }
            },
            {
                $sort: { "_id": 1 }
            }
        ]);

        return years.map(year => year._id);
    } catch (error) {
        console.log('Error obteniendo años existentes:', error);
        return [];
    }
};

/**
 * Detecta qué años faltan en la base de datos
 * @param {number} startYear - Año de inicio (opcional)
 * @param {number} endYear - Año de fin (opcional)
 * @returns {Promise<Object>} Objeto con años existentes, esperados y faltantes
 */
export const findMissingYears = async (startYear = null, endYear = null) => {
    try {
        const existingYears = await getExistingYears();
        
        if (existingYears.length === 0) {
            console.log('No hay datos en la base de datos');
            return {
                existingYears: [],
                expectedYears: [],
                missingYears: [],
                totalExisting: 0,
                totalExpected: 0,
                totalMissing: 0
            };
        }

        const minYear = startYear || Math.min(...existingYears);
        const maxYear = endYear || Math.max(...existingYears);
        
        const expectedYears = [];
        for (let year = minYear; year <= maxYear; year++) {
            expectedYears.push(year);
        }
        
        const missingYears = expectedYears.filter(year => !existingYears.includes(year));
        
        return {
            existingYears,
            expectedYears,
            missingYears,
            totalExisting: existingYears.length,
            totalExpected: expectedYears.length,
            totalMissing: missingYears.length
        };
    } catch (error) {
        console.log('Error detectando años faltantes:', error);
        return {
            existingYears: [],
            expectedYears: [],
            missingYears: [],
            totalExisting: 0,
            totalExpected: 0,
            totalMissing: 0
        };
    }
};

/**
 * Obtiene estadísticas detalladas por año
 * @returns {Promise<Array>} Estadísticas de documentos por año
 */
export const getYearlyStats = async () => {
    try {
        const stats = await pdf.aggregate([
            {
                $group: {
                    _id: { $year: "$publicationDate" },
                    count: { $sum: 1 },
                    publications: { $addToSet: "$publication" },
                    sections: { $addToSet: "$section" }
                }
            },
            {
                $sort: { "_id": 1 }
            }
        ]);

        return stats.map(stat => ({
            year: stat._id,
            documentCount: stat.count,
            uniquePublications: stat.publications.length,
            uniqueSections: stat.sections.length
        }));
    } catch (error) {
        console.log('Error obteniendo estadísticas por año:', error);
        return [];
    }
};

/**
 * Función principal para ejecutar el análisis de años faltantes
 */
export const analyzeMissingYears = async () => {
    try {
        console.log('🔍 Analizando años faltantes en la base de datos...\n');
        
        const result = await findMissingYears();
        
        console.log('📊 RESULTADOS DEL ANÁLISIS:');
        console.log('========================');
        console.log(`📅 Años existentes (${result.totalExisting}):`, result.existingYears);
        console.log(`📋 Años esperados (${result.totalExpected}):`, result.expectedYears);
        
        if (result.missingYears.length > 0) {
            console.log(`❌ Años faltantes (${result.totalMissing}):`, result.missingYears);
        } else {
            console.log('✅ No hay años faltantes en el rango esperado');
        }
        
        console.log('\n📈 Estadísticas detalladas por año:');
        console.log('================================');
        const yearlyStats = await getYearlyStats();
        yearlyStats.forEach(stat => {
            console.log(`${stat.year}: ${stat.documentCount} documentos, ${stat.uniquePublications} publicaciones, ${stat.uniqueSections} secciones`);
        });
        
        return result;
    } catch (error) {
        console.log('Error en el análisis:', error);
        return null;
    }
};

// Función para ejecutar el script directamente
const runAnalysis = async () => {
    try {
        await analyzeMissingYears();
        process.exit(0);
    } catch (error) {
        console.log('Error ejecutando el análisis:', error);
        process.exit(1);
    }
};

// Ejecutar si el archivo se ejecuta directamente
if (import.meta.url === `file://${process.argv[1]}`) {
    runAnalysis();
} 