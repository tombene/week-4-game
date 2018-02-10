$(document).ready(function () {

	var characters = {
		card0: { name: 'archmage', hp: 0, hpWeight: 0, attackPower: 0, attackPowerWeight: 6, counterAttackPower: 0, counterAttackPowerWeight: 10 },
		card1: { name: 'overlord', hp: 0, hpWeight: 4, attackPower: 0, attackPowerWeight: 6, counterAttackPower: 0, counterAttackPowerWeight: 2 },
		card2: { name: 'warbot', hp: 0, hpWeight: 2, attackPower: 0, attackPowerWeight: 3, counterAttackPower: 0, counterAttackPowerWeight: 4 },
		card3: { name: 'warraptor', hp: 0, hpWeight: 8, attackPower: 0, attackPowerWeight: 7, counterAttackPower: 0, counterAttackPowerWeight: 8 },
		card4: { name: 'zombielord', hp: 0, hpWeight: 10, attackPower: 0, attackPowerWeight: 6, counterAttackPower: 0, counterAttackPowerWeight: 2 },
		card5: { name: 'ninja_master', hp: 0, hpWeight: 10, attackPower: 0, attackPowerWeight: 6, counterAttackPower: 0, counterAttackPowerWeight: 2 },
		card6: { name: 'bear_cavalry', hp: 0, hpWeight: 10, attackPower: 0, attackPowerWeight: 6, counterAttackPower: 0, counterAttackPowerWeight: 2 },
		card7: { name: 'ships_captain', hp: 0, hpWeight: 10, attackPower: 0, attackPowerWeight: 6, counterAttackPower: 0, counterAttackPowerWeight: 2 },
		card8: { name: 'starlyte', hp: 0, hpWeight: 10, attackPower: 0, attackPowerWeight: 6, counterAttackPower: 0, counterAttackPowerWeight: 2 },
		card: '',
		characterCount: 9,
		selectedCards: [],
		smashCardsPicked: 0,
		enemyCardsPicked: 0,
		numAttacks: 0,
		heroPicks: [],
		heroAttackPower: 0,
		heroHp: 0,
		enemyPicks: [],
		enemyHp: 0,
		enemyCounterAttackPower: 0,
		enemiesDefeated: 0,
		adjustValues: function (theAttack = 0, theCounterAttack = 0) {
			for (var i = 0; i < 2; i++) {
				if (theAttack > 0) {
					this.enemyHp -= theAttack;
					this.heroHp -= theCounterAttack;
					this.heroAttackPower *= 2;
				}
				this.heroAttackPower += this[this.heroPicks[i]].attackPower;
				this.heroHp += this[this.heroPicks[i]].hp;
				this.enemyCounterAttackPower += this[this.enemyPicks[i]].counterAttackPower;
				this.enemyHp += this[this.enemyPicks[i]].hp;
			}
		},
		displayAttackOutcome: function(){
			$('#play-by-play').text('You dealt ' + this.heroAttackPower + ' damage and your foes returned ' + this.enemyCounterAttackPower + ' damage');
			console.log('attack output');
		}
	}
	// var randomProperty = function (obj) {
	// 	var keys = Object.keys(obj)
	// 	return obj[keys[keys.length * Math.random() << 0]];
	// };
	function initializeBoard() {
		for (var i = 0; i < characters.characterCount; i++) {
			var tempCard = 'card' + i;
			//set hp
			characters[tempCard].hp = Math.floor(Math.random() * 100) + 100 + characters[tempCard].hpWeight;
			//set attack power
			characters[tempCard].attackPower = Math.floor(Math.random() * 10) + characters[tempCard].attackPowerWeight;
			//set counter attack power
			characters[tempCard].counterAttackPower = Math.floor(Math.random() * 20) + characters[tempCard].counterAttackPowerWeight;
		}

		var randomCard = Math.floor(Math.random() * Math.floor(characters.characterCount));

		console.log('randomCard: ' + randomCard);
		while (characters.selectedCards.length <= 8) {
			if (characters.selectedCards.includes(randomCard) === false) {
				characters.selectedCards.push(randomCard);
				randomCard = Math.floor(Math.random() * Math.floor(characters.characterCount));
			} else {
				randomCard = Math.floor(Math.random() * Math.floor(characters.characterCount));
			}
		}
		console.log(characters.selectedCards);

		for (var i = 0; i < characters.selectedCards.length; i++) {
			var tempCard = 'card' + characters.selectedCards[i];
			// $('.lineup').text('hello' + i);
			$('.lineup').append('<div class="col-md-2 card-container available" id="' + tempCard + '"><img class="card-img" src="assets/images/' + characters[tempCard].name + '.jpg" alt="' + characters[tempCard].name + '"><div class="hp"><h5>' + characters[tempCard].hp + '</h5></div>');
		}
		// for (x in characters){
		// 	characters[x].hp = Math.floor(Math.random() * Math.floor(200 + characters.card + characters[x].hpWeight)) + 100;
		// 	console.log(characters[x].hp);
		// }
	}

	initializeBoard();
	//*****************Done initializing game ***************************************************/////////////////////////////////////////////
	$('.available').on('click', function () {
		$('#play-by-play').text('');
		if (characters.enemyCardsPicked === 0 && characters.smashCardsPicked != 2) {
			characters.smashCardsPicked++;
			console.log('card clicked' + characters.smashCardsPicked);
			$('.your-smashup').append(this);
			$(this).attr('class', 'col-md-2 card-container picked-hero');
			characters.heroPicks.push($(this).attr('id'));
			if (characters.smashCardsPicked === 2) {
				$('.enemies').append($('.available'));
				$('.available').attr('class', 'col-md-2 card-container enemy-options');
			}
		}



		$('.enemy-options').on('click', function () {
			characters.enemyCardsPicked++;
			console.log(this);
			$('.defenders-ready').append(this);
			$(this).attr('class', 'col-md-2 card-container picked-enemy');
			characters.enemyPicks.push($(this).attr('id'));
			if (characters.enemyCardsPicked === 2) {
				$('.enemies').attr('class', 'hide');
			}
		});

	});

	$('#btn-attack').on('click', function () {
		if (characters.enemyCardsPicked > 1 && characters.smashCardsPicked > 1) {
			characters.adjustValues();
			characters.displayAttackOutcome();
		} else {
			$('#play-by-play').text('Game not set up yet, finish picking your cards.');
		}
		console.log(characters.heroAttackPower);
	});


});
