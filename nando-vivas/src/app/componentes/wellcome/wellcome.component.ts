import { Component, OnInit, inject, signal } from '@angular/core';
import { ProjectsService } from '../../servicios/projects.service';
import { Project } from '../../interfaces/project';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-wellcome',
    standalone: true,
    imports: [RouterModule, CommonModule],
    templateUrl: './wellcome.component.html',
    styleUrls: ['./wellcome.component.css']
})
export class WellcomeComponent implements OnInit {
  private projectService = inject(ProjectsService); // Inyectamos el servicio ProjectsService
  projects = signal<Project[]>([]); // Usamos signals para almacenar los proyectos

  ngOnInit() {
    this.projectService.getProjects().subscribe(
      (projects: Project[]) => {
        console.log("Proyectos recibidos en WellcomeComponent:", projects);
        this.projects.set(projects); // Actualizamos la señal con los proyectos obtenidos
      },
      (error) => {
        console.error("Error al obtener proyectos:", error);
      }
    );
  }
}
