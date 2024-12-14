import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

const DEFAULT_KEY = 'defaultStorageKey'; // Llave por defecto para el almacenamiento

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  // Obtener un elemento específico por clave
  async getItem(key: string): Promise<string | null> {
    try {
      const obj = await Preferences.get({ key });
      return obj.value;
    } catch (error) {
      console.error(`Error obteniendo el item con la llave ${key}:`, error);
      return null;
    }
  }

  // Guardar un elemento específico por clave
  private async setItem(key: string, valor: string): Promise<void> {
    try {
      await Preferences.set({ key, value: valor });
    } catch (error) {
      console.error(`Error estableciendo el item con la llave ${key}:`, error);
    }
  }

  // Remover un elemento específico por clave
  private async removeItem(key: string): Promise<void> {
    try {
      await Preferences.remove({ key });
    } catch (error) {
      console.error(`Error removiendo el item con la llave ${key}:`, error);
    }
  }

  // Guardar datos en el almacenamiento (con clave predeterminada o personalizada)
  async agregarStorage(data: any, customKey: string = DEFAULT_KEY): Promise<void> {
    try {
      await this.setItem(customKey, JSON.stringify(data));
    } catch (error) {
      console.error(`Error agregando datos al storage con la llave ${customKey}:`, error);
    }
  }

  // Obtener datos del almacenamiento (con clave predeterminada o personalizada)
  async obtenerStorage(customKey: string = DEFAULT_KEY): Promise<any[]> {
    try {
      const data = await this.getItem(customKey);
      if (data === null) {
        return [];
      }
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error obteniendo datos del storage con la llave ${customKey}:`, error);
      return [];
    }
  }

  // Remover datos del almacenamiento (con clave predeterminada o personalizada)
  async removerStorage(customKey: string = DEFAULT_KEY): Promise<void> {
    try {
      await this.removeItem(customKey);
    } catch (error) {
      console.error(`Error removiendo datos del storage con la llave ${customKey}:`, error);
    }
  }
}
