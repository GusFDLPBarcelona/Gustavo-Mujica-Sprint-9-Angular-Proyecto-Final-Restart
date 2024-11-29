import { Component, OnInit, inject, signal, } from '@angular/core';
import { ProjectsService } from '../../servicios/projects.service';
import { Project } from '../../interfaces/project';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FirestoreService } from '../../servicios/firestore.service';

@Component({
    selector: 'app-wellcome',
    imports: [RouterModule, CommonModule],
    templateUrl: './wellcome.component.html',
    styleUrls: ['./wellcome.component.css']
})
export class WellcomeComponent implements OnInit {
  private projectService = inject(ProjectsService);
  projects = signal<Project[]>([]);

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {
    this.firestoreService.getProjects().subscribe(
      (projects: Project[]) => {
        console.log("Proyectos recibidos en WellcomeComponent:", projects);
        this.projects.set(projects);
      },
      (error) => {
        console.error("Error al obtener proyectos:", error);
      }
    );
  }
  
  }

