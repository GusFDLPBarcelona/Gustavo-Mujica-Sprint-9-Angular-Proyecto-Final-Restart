import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectsService } from '../../servicios/projects.service';
import { Project } from '../../interfaces/project';

@Component({
    selector: 'app-home',
    imports: [RouterModule, CommonModule],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
 
  projects = signal<Project[]>([]);
  categories = signal(['All', 'Editorial', 'Branding', 'Typography', 'Packaging', 'Illustration', 'Web & SM']);
  activeCategory = signal<string>('All');
  ngOnInit() {
    
    const projectService = inject(ProjectsService);
    projectService.getProjects().subscribe((projects: Project[]) => {
      this.projects.set(projects);
    });
  }
  setActiveCategory(category: string) {
    this.activeCategory.set(category);
  }

  sortedProjects = computed(() => {
    const category = this.activeCategory();
    return this.projects().filter(project => 
      category === 'All' || project.category === category
    );
  });
}
