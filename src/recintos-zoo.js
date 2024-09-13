class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: "savana", tamanhoTotal: 10, animaisExistentes: { macaco: 3 } },
            { numero: 2, bioma: "floresta", tamanhoTotal: 5, animaisExistentes: {} },
            { numero: 3, bioma: "savana e rio", tamanhoTotal: 7, animaisExistentes: { gazela: 1 } },
            { numero: 4, bioma: "rio", tamanhoTotal: 8, animaisExistentes: {} },
            { numero: 5, bioma: "savana", tamanhoTotal: 9, animaisExistentes: { leão: 1 } }
        ];
        this.animaisPermitidos = {
            leão: { tamanho: 3, biomas: ["savana"] },
            leopardo: { tamanho: 2, biomas: ["savana"] },
            crocodilo: { tamanho: 3, biomas: ["rio"] },
            macaco: { tamanho: 1, biomas: ["savana", "floresta"] },
            gazela: { tamanho: 2, biomas: ["savana"] },
            hipopotamo: { tamanho: 4, biomas: ["savana", "rio"] }
        };
    }
    analisaRecintos(animal, quantidade) {
        const animalLower = animal.toLowerCase();
        if (!this.animaisPermitidos[animalLower]) {
            return { erro: "Animal inválido", recintosViaveis: null };
        }
        if (quantidade <= 0) {
            return { erro: "Quantidade inválida", recintosViaveis: null };
        }
        const animalInfo = this.animaisPermitidos[animalLower];
        const recintosViaveis = [];
        this.recintos.forEach(recinto => {
            const biomaValido = animalInfo.biomas.includes(recinto.bioma);
            const animaisExistentes = recinto.animaisExistentes;
            let espacoOcupado = 0;
            for (let especie in animaisExistentes) {
                espacoOcupado += this.animaisPermitidos[especie].tamanho * animaisExistentes[especie];
            }

            if (biomaValido) {
                let espacoRestante = recinto.tamanhoTotal - espacoOcupado;
                if (animaisExistentes[animalLower]) {
                    espacoRestante -= quantidade * animalInfo.tamanho;
                } else if (Object.keys(animaisExistentes).length > 0) {
                    espacoRestante -= (quantidade * animalInfo.tamanho + 1); // Espaço extra para múltiplas espécies
                } else {
                    espacoRestante -= quantidade * animalInfo.tamanho;
                }
                if (espacoRestante >= 0) {
                    recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoRestante} total: ${recinto.tamanhoTotal})`);
                }
            }
        });

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável", recintosViaveis: null };
        }
        return { erro: null, recintosViaveis };
    }
}
export { RecintosZoo as RecintosZoo };
