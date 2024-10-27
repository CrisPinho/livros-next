import * as Editora from '../modelo/Editora';

export class ControleEditora {
    
    private editoras: Array<Editora.Editora> = [
        new Editora.Editora(1, 'Editora Arqueiro'),
        new Editora.Editora(2, 'Editora Record'),
        new Editora.Editora(3, 'Editora Agir')
    ];

    public getEditoras(): Array<Editora.Editora> {
        return this.editoras;
    }

    public getNomeEditora(codEditora: number): string | undefined {
        const editora = this.editoras.filter(ed => ed.codEditora === codEditora);
        return editora.length > 0 ? editora[0].nome : undefined;
    }
}

export default ControleEditora;