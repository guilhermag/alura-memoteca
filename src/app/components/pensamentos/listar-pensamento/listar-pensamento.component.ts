import { Component } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css'],
})
export class ListarPensamentoComponent {
  listaPensamentos: Pensamento[] = [];
  haMaisPensamentos: boolean = true;
  semPensamentos = this.listaPensamentos.length === 0;
  paginaAtual = 1;
  filtro: string = '';
  favoritos: boolean = false;
  listaFavoritos: Pensamento[] = [];
  titulo: string = 'Meu Mural';

  constructor(private pensamentoService: PensamentoService) {}

  ngOnInit(): void {
    this.pensamentoService
      .listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe((res) => {
        this.listaPensamentos = res;
      });
  }

  pesquisarPensamentos() {
    this.titulo = 'Meu Mural';
    this.favoritos = false;
    this.haMaisPensamentos = true;
    this.paginaAtual = 1;
    this.pensamentoService
      .listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe((listaPensamentos) => {
        this.listaPensamentos = listaPensamentos;
      });
  }

  carregarMaisPensamentos() {
    this.pensamentoService
      .listar(++this.paginaAtual, this.filtro, this.favoritos)
      .subscribe((listapensamento) => {
        this.listaPensamentos.push(...listapensamento);
        if (!listapensamento.length) {
          this.haMaisPensamentos = false;
        }
      });
  }

  listarFavoritos() {
    this.titulo = 'Meus Favoritos';
    this.favoritos = true;
    this.haMaisPensamentos = true;
    this.paginaAtual = 1;
    this.pensamentoService
      .listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe((listaPensamentos) => {
        this.listaPensamentos = listaPensamentos;
        this.listaFavoritos = listaPensamentos;
      });
  }
}
