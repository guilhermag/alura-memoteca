import { Component, Input } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrls: ['./pensamento.component.css'],
})
export class PensamentoComponent {
  @Input() pensamento: Pensamento = {
    id: 1,
    conteudo: 'pensamento',
    autoria: 'autor',
    modelo: 'modelo1',
    favorito: false,
  };

  @Input() listaFavoritos: Pensamento[] = [];

  constructor(private pensamentoService: PensamentoService) {}

  ngOnInit(): void {}

  larguraPensamento(): string {
    if (this.pensamento.conteudo.length >= 256) {
      return 'pensamento-g';
    }
    return 'pensamento-p';
  }

  checarFavorito(): string {
    return this.pensamento.favorito
      ? 'icone-favorito-ativo.png'
      : 'icone-favorito-inativo.png';
  }

  mudarFavorito() {
    this.pensamentoService.mudarFavorito(this.pensamento).subscribe(() => {
      this.listaFavoritos.splice(
        this.listaFavoritos.indexOf(this.pensamento),
        1
      );
    });
  }
}
