import { findMissingYears, getYearlyStats, getExistingYears } from './queries/missingYears.js';
import connection from './databases/mongo.js';

const testMissingYears = async () => {
    try {
        console.log('🔍 Conectando a la base de datos...');
        await connection();
        
        console.log('\n📊 Probando funciones de años faltantes...\n');
        
        // 1. Obtener años existentes
        console.log('1️⃣ Años existentes en la base de datos:');
        const existingYears = await getExistingYears();
        console.log('   Años:', existingYears);
        console.log('   Total:', existingYears.length);
        
        // 2. Detectar años faltantes
        console.log('\n2️⃣ Detectando años faltantes:');
        const missingResult = await findMissingYears();
        console.log('   Años existentes:', missingResult.existingYears);
        console.log('   Años esperados:', missingResult.expectedYears);
        console.log('   Años faltantes:', missingResult.missingYears);
        console.log('   Total faltantes:', missingResult.totalMissing);
        
        // 3. Estadísticas por año
        console.log('\n3️⃣ Estadísticas por año:');
        const stats = await getYearlyStats();
        stats.forEach(stat => {
            console.log(`   ${stat.year}: ${stat.documentCount} documentos, ${stat.uniquePublications} publicaciones, ${stat.uniqueSections} secciones`);
        });
        
        console.log('\n✅ Prueba completada exitosamente!');
        
    } catch (error) {
        console.error('❌ Error en la prueba:', error);
    } finally {
        process.exit(0);
    }
};

// Ejecutar la prueba
testMissingYears(); 