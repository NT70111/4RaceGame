class Race {
    constructor(damage, health, name, attackMove) {
        this.name = name;
        this.health = health;
        this.damage = damage;
        this.attackMove = attackMove;
    }
    attack(enemy) {
        enemy.health = enemy.health - this.damage
        console.log(this.attackMove);
        console.log(enemy.name + ' health:' + enemy.health);
    }
}

class Human extends Race {
    constructor() {
        super(10, 100, "human", 'человек бьет врага палкой');
    }
}

class Orc extends Race {
    constructor() {
        super(20, 100, "orc", 'орк врага бьет дубиной');
    }
}

class Elf extends Race {
    constructor() {
        super(12, 100, "elf", 'эльф стреляет в врага из лука');
    }
}

class Dwarf extends Race {
    constructor() {
        super(15, 100, "dwarf", 'дворф бьет врага топором');
    }
}


class RaceFactory {
    static makeRace(input) {
        switch (input) {
            case "human":
                return new Human();
            case "elf":
                return new Elf();
            case "dwarf":
                return new Dwarf();
            case "orc":
                return new Orc();
            default:
                throw new Error("Unknown race");
        }
    }
}


class GameStart {
    start() {
        let input = prompt(
            "Выберите расу: human, elf, dwarf, orc"
        );
        this.player = RaceFactory.makeRace(input);
        console.log("Вы выбрали:", this.player.name, "Здоровье:", this.player.health, "Урон:", this.player.damage);
    }
}

const game = new GameStart();


function fight() {
    const firstHitPlayer = game.player;
    const enemieslist = {
        proverka() {
            if (firstHitPlayer.name === 'human') {
                let races = [Elf, Dwarf, Orc];
                races.sort(function () {
                    return Math.random() - 0.5;
                });
                return races;
            }
            if (firstHitPlayer.name === 'orc') {
                let races = [Human, Elf, Dwarf];
                races.sort(function () {
                    return Math.random() - 0.5;
                });
                return races;
            }
            if (firstHitPlayer.name === 'dwarf') {
                let races = [Human, Elf, Orc];
                races.sort(function () {
                    return Math.random() - 0.5;
                });
                return races;
            }
            if (firstHitPlayer.name === 'elf') {
                let races = [Human, Dwarf, Orc];
                races.sort(function () {
                    return Math.random() - 0.5;
                });
                return races;
            }
        }
    };

    const enemies = enemieslist.proverka();
    const enemy1 = new enemies[0]();
    const enemy2 = new enemies[1]();
    const enemy3 = new enemies[2]();

    while (firstHitPlayer.health > 0 && (enemy1.health > 0 || enemy2.health > 0 || enemy3.health > 0)) {
        if (firstHitPlayer.health > 0) {
            let target;
            if (enemy1.health > 0) {
                target = enemy1;
            }
            else if (enemy2.health > 0) {
                target = enemy2;
            }
            else if (enemy3.health > 0) {
                target = enemy3;
            }
            if (target) {
                firstHitPlayer.attack(target);
            }
        }

        if (enemy1.health > 0) {
            let target;
            if (enemy2.health > 0) {
                target = enemy2;
            }
            else if (enemy3.health > 0) {
                target = enemy3;
            }
            else if (firstHitPlayer.health > 0) {
                target = firstHitPlayer;
            }
            if (target) {
                enemy1.attack(target);
            }
        }


        if (enemy2.health > 0) {
            let target;
            if (enemy3.health > 0) {
                target = enemy3;
            }
            else if (firstHitPlayer.health > 0) {
                target = firstHitPlayer;
            }
            else if (enemy1.health > 0) {
                target = enemy1;
            }
            if (target) {
                enemy2.attack(target);
            }
        }


        if (enemy3.health > 0) {
            let target;
            if (firstHitPlayer.health > 0) {
                target = firstHitPlayer;
            }
            else if (enemy1.health > 0) {
                target = enemy1;
            }
            else if (enemy2.health > 0) {
                target = enemy2;
            }
            if (target) {
                enemy3.attack(target);
            }
        }

        if (firstHitPlayer.health <= 0) {
            console.log('Ваш герой погиб')
        }
    }
}
