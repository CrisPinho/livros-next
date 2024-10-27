import { Livro } from '../modelo/Livro';

export class ControleLivro {
    private livros: Array<Livro> = [
        new Livro(1, 1, 'O código da Vinci', 'O Código Da Vinci é um romance policial que tem como protagonista um simbologista norte-americano. Através da obra de Leonardo Da Vinci, onde encontra várias pistas para solucionar crimes.', ['Dam Brown']),
        new Livro(2, 2, 'O diário de Anne Frank', 'Escrito entre 12 de junho de 1942 e 1 de agosto de 1944, O Diário de Anne Frank foi publicado pela primeira vez em 1947, por iniciativa de seu pai, revelando ao mundo o dia a dia de dois longos anos de uma adolescente forçada a esconder-se, juntamente com a sua família e um grupo de outros judeus, durante a ocupação nazi da cidade de Amesterdão.Todos os que se encontravam naquele pequeno anexo secreto acabaram por ser presos em agosto de 1944, e em março de 1945 Anne Frank morreu no campo de concentração de Bergen-Belsen, a escassos dois meses do final da guerra na Europa. O seu diário tornar-se-ia um dos livros de não ficção mais lidos em todo o mundo.', ['Anne Frank']),
        new Livro(3, 3, 'O Pequeno Príncipe', 'Esta nova edição do Pequeno príncipe, de Antoine de Saint-Exupéry, está totalmente em conformidade com a original americana, a única feita com o autor ainda vivo, em 1943. Saint-Exupéry, exilado nos Estados Unidos de 1941 a 1943 e impossibilitado de manter um relacionamento mais próximo com seu editor parisiense, confiou à editora nova-iorquina Reynal & Hitchcock o sonho de publicar as duas primeiras edições da obra, uma em francês e outra em inglês, ambas reproduzindo as célebres aquarelas. Somente três anos mais tarde, em 30 de novembro de 1945, saía da gráfica a primeira edição do Pequeno príncipe na França, pela Librairie Gallimard. Comparando-se as duas edições americanas de 1943 com a edição póstuma francesa de 1945, verificamos diferenças significativas na reprodução dos desenhos de Saint-Exupéry. Por que tantas variações? Como o gráfico francês não dispunha dos desenhos originais do autor, ele partiu das ilustrações de uma das edições que podemos julgar muito "avivadas" ou "remontadas". As pinceladas, ainda bem visíveis na edição de 1943, desapareceram sob o efeito do polimento das cores, e muitos detalhes foram alterados. Portanto, decidimos publicar esta nova edição do Pequeno príncipe a partir da edição norte-americana.', ['Antoine de Saint-Exupéry'])
    ];

    public obterLivros(): Array<Livro> {
        return this.livros;
    }

    public incluir(livro: Livro): void {
        const maxCodigo = this.livros.length > 0 
            ? Math.max(...this.livros.map(l => l.codigo)) 
            : 0;
        
        livro.codigo = maxCodigo + 1; 
        this.livros.push(livro); 
    }

    public excluir(codigo: number): void {
        const index = this.livros.findIndex(l => l.codigo === codigo);
        if (index !== -1) {
            this.livros.splice(index, 1); 
        }
    }
}

export default ControleLivro;