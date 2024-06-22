import { initializeDatabase } from './init.db';

async function main() {
  try {
    await initializeDatabase();
    // Hier kannst du den restlichen Code deiner Anwendung einfügen
    console.log('Database initialization complete.');
  } catch (error) {
    console.error('Error during database initialization:', error);
  }
}

main().catch(err => console.error('Error in main function:', err));
