import { Injectable } from '@angular/core'; 
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private firebase: AngularFireAuth) {}

  getAuthState(): Observable<any> {
    return this.firebase.authState;
  }

  async auth(email: string, password: string) {
    const request = await this.firebase.signInWithEmailAndPassword(email, password);
    return request;
  }

  async registrar(email: string, password: string) {
    const request = await this.firebase.createUserWithEmailAndPassword(email, password);
    return request;
  }

  async recuperar(email: string) {
    const request = await this.firebase.sendPasswordResetEmail(email);
    return request;
  }

  async logOut() {
    await this.firebase.signOut();  
  }

  // Método corregido para obtener el token del usuario actual
  async getCurrentUserToken(): Promise<string | null> {
    const user = await this.firebase.currentUser; // Cambiado afAuth por firebase
    return user ? await user.getIdToken() : null;
  }
}
