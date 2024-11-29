import { Injectable } from '@angular/core';
import { Firestore, collectionData, docData, doc, addDoc, updateDoc, deleteDoc, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from '../interfaces/project';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private collectionName = 'Projects'; // Especifica la colección de proyectos

  constructor(private firestore: Firestore) {}

  // Obtener todos los proyectos
  getProjects(): Observable<Project[]> {
    console.log("Obteniendo proyectos..."); 
    const collectionRef = collection(this.firestore, this.collectionName);
    return collectionData(collectionRef, { idField: 'id' }).pipe(
      map((items: any[]) => items.map((item: any) => ({    
        id: item.id,
        title: item.title || '',
        client: item.client || '',
        category: item.category || '',
        image: item.image || '',
        ...item
      }) as Project))
    );    
  }

  // Obtener un proyecto por su ID
  getProjectById(projectId: string): Observable<Project> {
    const docRef = doc(this.firestore, `${this.collectionName}/${projectId}`);
    return docData(docRef, { idField: 'id' }).pipe(
      map((item: any) => ({
        id: item.id,
        title: item.title || '',
        client: item.client || '',
        category: item.category || '',
        image: item.image || '',
        ...item
      }) as Project)
    );
  }

  // Agregar un nuevo proyecto
  addProject(project: Project): Observable<void> {
    const collectionRef = collection(this.firestore, this.collectionName);
    return addDoc(collectionRef, project) as unknown as Observable<void>;
  }

  // Actualizar un proyecto existente
  updateProject(projectId: string, project: Partial<Project>): Observable<void> {
    const docRef = doc(this.firestore, `${this.collectionName}/${projectId}`);
    return updateDoc(docRef, project) as unknown as Observable<void>;
  }

  // Eliminar un proyecto
  deleteProject(projectId: string): Observable<void> {
    const docRef = doc(this.firestore, `${this.collectionName}/${projectId}`);
    return deleteDoc(docRef) as unknown as Observable<void>;
  }
}
