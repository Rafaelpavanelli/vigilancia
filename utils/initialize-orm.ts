import { AppDataSource } from '@/ormconfig'

export async function initializeOrm() {
  const database = AppDataSource

  if (!database.isInitialized) {
    await database.initialize()
  }

  return database
}
