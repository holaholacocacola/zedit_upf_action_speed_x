/* global ngapp, xelib, registerPatcher, patcherUrl */
// patcher for Action Speed X


var BOOTS         = 'Boots';
var CUIRASS       = 'Cuirass';
var GAUNTLETS     = 'Gauntlets';
var HELMET        = 'Helmet';
var SHIELD        = 'Shield';

var ATTACK_SPEED  = 'AttackSpeed';
var MAGICKA       = 'MagickaRegen';
var MOVE_SPEED    = 'MoveSpeed';
var POWER_ATTACKS = 'PowerAttacks';
var RATTACK_SPEED = 'RangedAttack';
var SPELL_COST    = 'SpellCosts';
var STAMINA       = 'StaminaRegen';

var LIGHT         = 'Light';
var MEDIUM        = 'Medium';
var HEAVY         = 'Heavy';

var VOKRII_ARENALINE = 'VKR_Alc_Adrenaline_Spell_Ab';
var VOKRI_WINDRUNNER = 'VKR_Lia_Windrunner_Spell_Ab';
var VOKRI_WARD_DANCER = 'VKR_Lia_Wardancer_Spell_Ab';



var ADAMANT_AGILITY1   = 'MAG_PerkAgility30'; // -> stamina regen
var ADAMANT_AGILITY2   = 'MAG_PerkAgility60'; //-> stamina regen
var ADAMANT_ATHLETICS1 = 'MAG_abAthletics40'; // -> move speed
var ADAMANT_ATHLETICS2 = 'MAG_abAthletics60';// -> move speed
var ADAMANT_AKATOSH    = 'MAG_abPilgrimAkatosh'; // move speed

var VANILLA_WINDWALKER = 'PerkWindWalkerStamina';// stamina regen ->1%

var ORDINATOR_FLIGHT     = 'ORD_Lia_FightOrFlight_Spell_Ab'; // move speed 
var ORDINATOR_WINDRUNNER = 'ORD_Lia_Windrunner_Spell_Ab'; // stam regen?
var ORDINATOR_WINDBORNE  = 'ORD_Lia_Windrunner_Spell_Ab';// move speed

registerPatcher({
    info: info,
    gameModes: [xelib.gmSSE, xelib.gmTES5],
    settings: {
        label: "Action Speed X",
        hide: false,
		templateUrl: `${patcherUrl}/partials/settings.html`,
        defaultSettings: {
            patchFileName: 'action_speed_patch_x.esp',
			moveSpeed: true,
			attackSpeed: true,
			rangedSpeed: true,
			staminaRegen: false,
			magickaRegen: false,
			powerAttacks: false,
			spellCosts: true,
			// allowCreatures: false,
			racialAbilities: true,
			allowFactions: true,
			descriptions: true,
			balancePerks: true
        }
    },
    requiredFiles: ['ActionSpeedX.esp'],
    getFilesToPatch: function(filenames) {
        return filenames.filter(function(value, index, arr) {
            return (value != `ActionSpeedX.esp`);
        });
    },
    execute: (patchFile, helpers, settings, locals) => ({
        initialize: function() {


			let actionSpeedX = xelib.FileByName("ActionSpeedX.esp");
            let descriptionData = require(patcherPath + '\\data\\armor_descriptions.json');
			locals.effectDescriptions = descriptionData['Descriptions'];
			locals.effectMagnitudes = descriptionData['Magnitudes'];
			
			// load the light armor keywords
			locals.armorRanks = require(patcherPath + '\\data\\armor_rankings.json');
			
			locals.lightBootsKeywords = [
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_LightArmorBootsT1')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_LightArmorBootsT2')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_LightArmorBootsT3')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_LightArmorBootsT4'))
			];
			
			locals.lightCuirassKeywords = [
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_LightArmorCuirassT1')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_LightArmorCuirassT2')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_LightArmorCuirassT3')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_LightArmorCuirassT4'))
			];
			
			locals.lightGauntletsKeywords = [
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_LightArmorGauntletsT1')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_LightArmorGauntletsT2')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_LightArmorGauntletsT3')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_LightArmorGauntletsT4'))
			];
			
			locals.lightHelmetKeywords = [
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_LightArmorHelmetT1')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_LightArmorHelmetT2')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_LightArmorHelmetT3')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_LightArmorHelmetT4'))
			];
			
			let lightShieldKeywords = [
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_LightArmorShieldT1')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_LightArmorShieldT2')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_LightArmorShieldT3')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_LightArmorShieldT4'))
			];
			
			//look up table for keywords
			locals.lightSlots = {
				[BOOTS]:     locals.lightBootsKeywords,
				[CUIRASS]:   locals.lightCuirassKeywords,
				[GAUNTLETS]: locals.lightGauntletsKeywords,
				[HELMET]:    locals.lightHelmetKeywords,
				[SHIELD]:    lightShieldKeywords
			};
			 // load the heavy armor keywords
			locals.heavyBootsKeywords = [
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_HeavyArmorBootsT1')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_HeavyArmorBootsT2')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_HeavyArmorBootsT3')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_HeavyArmorBootsT4'))
			];
			
			locals.heavyCuirassKeywords = [
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_HeavyArmorCuirassT1')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_HeavyArmorCuirassT2')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_HeavyArmorCuirassT3')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_HeavyArmorCuirassT4'))
			];
			
			locals.heavyGauntletsKeywords = [
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_HeavyArmorGauntletsT1')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_HeavyArmorGauntletsT2')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_HeavyArmorGauntletsT3')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_HeavyArmorGauntletsT4'))
			];
			
			locals.heavyHelmetKeywords = [
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_HeavyArmorHelmetT1')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_HeavyArmorHelmetT2')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_HeavyArmorHelmetT3')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_HeavyArmorHelmetT4'))
			];
			
			locals.heavyShieldKeywords = [
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_HeavyArmorShieldT1')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_HeavyArmorShieldT2')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_HeavyArmorShieldT3')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_HeavyArmorShieldT4'))
			];
			
			//look up table for keywords
			locals.heavySlots = {
				[BOOTS]:     locals.heavyBootsKeywords,
				[CUIRASS]:   locals.heavyCuirassKeywords,
				[GAUNTLETS]: locals.heavyGauntletsKeywords,
				[HELMET]:    locals.heavyHelmetKeywords,
				[SHIELD]:    locals.heavyShieldKeywords
			};
			
			// load perks to add to playable races
			locals.moveSpeedPerks = [
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_ArmorSpeedMasteryPerk')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_LightArmorMoveSpeedPenaltiesPerk')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_HeavyArmorMoveSpeedPenaltiesPerk'))
				//xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_MediumArmorMoveSpeedPenaltiesPerk')),
			];
			
			locals.attackSpeedPerks = [
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_OneHandedAttackSpeedBuffPerk')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_TwoHandedAttackSpeedBuffPerk')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_LightArmorAttackSpeedPenaltiesPerk')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_HeavyArmorAttackSpeedPenaltiesPerk'))
				//xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_MediumArmorAttackSpeedPenaltiesPerk'))
			];
	
			locals.rangedAttackSpeedPerks = [
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_RangedAttackSpeedBoostPerk')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_LightArmorRangedAttackSpeedPenaltiesPerk')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_HeavyArmorRangedAttackSpeedPenaltiesPerk'))
				//xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_MediumArmorRangedAttackSpeedPenaltiesPerk'))
			];
			
			locals.powerAttackPerks = [
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_OneHandedPowerAttackStaminaCostReductionPerk')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_TwoHandedPowerAttackStaminaCostReductionPerk')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_LightArmorGauntletsPowerAttackPenaltyPerk')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_LightArmorHelmetPowerAttackPenaltyPerk')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_LightArmorBootsPowerAttackPenaltyPerk')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_LightArmorShieldPowerAttackPenaltyPerk')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_LightArmorCuirassPowerAttackPenaltyPerk')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_HeavyArmorGauntletsPowerAttackPenaltyPerk')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_HeavyArmorHelmetPowerAttackPenaltyPerk')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_HeavyArmorBootsPowerAttackPenaltyPerk')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_HeavyArmorShieldPowerAttackPenaltyPerk')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_HeavyArmorCuirassPowerAttackPenaltyPerk'))
				//xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_MediumArmorBootsPowerAttackPenaltyPerk'))
				//xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_MediumArmorCuirassPowerAttackPenaltyPerk')),
				//xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_MediumArmorGauntletsPowerAttackPenaltyPerk')),
				//xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_MediumArmorHelmetPowerAttackPenaltyPerk')),
				//xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_MediumArmorShieldPowerAttackPenaltyPerk')),
			];
			
			locals.spellCostPerks = [
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_DestructionSpellCostReductionPerk')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_AlterationSpellCostReductionPerk')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_IllusionSpellCostReductionPerk')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_ConjurationSpellCostReductionPerk')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_RestorationSpellCostReductionPerk')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_LightArmorBootsSpellCostPenaltyPerk')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_LightArmorHelmetSpellCostPenaltyPerk')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_LightArmorCuirassSpellCostPenaltyPerk')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_LightArmorGauntletsSpellCostPenaltyPerk')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_LightArmorShieldSpellCostPenaltyPerk')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_HeavyArmorBootsSpellCostPenaltyPerk')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_HeavyArmorHelmetSpellCostPenaltyPerk')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_HeavyArmorCuirassSpellCostPenaltyPerk')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_HeavyArmorGauntletsSpellCostPenaltyPerk')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_HeavyArmorShieldSpellCostPenaltyPerk'))
				//xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_MediumArmorBootsSpellCostPenaltyPerk'))
				//xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_MediumArmorHelmetSpellCostPenaltyPerk')),
				//xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_MediumArmorCuirassSpellCostPenaltyPerk')),
				//xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_MediumArmorGauntletsSpellCostPenaltyPerk')),
				//xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_MediumArmorShieldSpellCostPenaltyPerk')),
			];
			
			
			locals.magickaRegenPerks = [
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_DestructionMagickaRegenPerk')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_AlterationMagickaRegenPerk')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_IllusionMagickaRegenPerk')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_ConjurationMagickaRegenPerk')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_RestorationMagickaRegenPerk')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_LightArmorMagickaRegenPenaltiesPerk')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_HeavyArmorMagickaRegenPenaltiesPerk'))
				//xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_MediumArmorMagickaRegenPenaltiesPerk'))
			];

			locals.staminaRegenPerks = [
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_LightArmorStaminaRateMultBoostPerk')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_HeavyArmorStaminaRateMultBoostPerk')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_LightArmorStaminaRegenPenaltiesPerk')),
				xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_HeavyArmorStaminaRegenPenaltiesPerk'))
				//xelib.GetHexFormID(xelib.GetElement(actionSpeedX,'ASX_MediumArmorStaminaRegenPenaltiesPerk')),
			]; 
			
			locals.perksToAppy = []
			if (settings.moveSpeed) {
				locals.perksToAppy.push(...locals.moveSpeedPerks);
			}
			if (settings.attackSpeed) {
				locals.perksToAppy.push(...locals.attackSpeedPerks);
			}
			if (settings.rangedSpeed) {
				locals.perksToAppy.push(...locals.rangedAttackSpeedPerks);
			}
			if (settings.staminaRegen) {
				locals.perksToAppy.push(...locals.staminaRegenPerks);
			}
			if (settings.magickaRegen) {
				locals.perksToAppy.push(...locals.magickaRegenPerks);
			}
			if (settings.powerAttacks) {
				locals.perksToAppy.push(...locals.powerAttackPerks);
			}
			if (settings.spellCosts) {
				locals.perksToAppy.push(...locals.spellCostPerks);
			}
			
			// Could check if perks is empty which mean the user clicked nothing, but fuck it, its your life


			let argonianPerk  = xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_ArgonianRacialProficiencyPerk'));
			let darkPerk  = xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_DunmerRacialProficiencyPerk'));
			let imperialPerk  = xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_ImperialRacialProficiencyPerk'));
			let nordPerk  = xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_NordRacialProficiencyPerk'));
			let orcPerk  = xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_OrcRacialProficiencyPerk'));
			let redguardPerk  = xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_RedguardRacialProficiencyPerk'));
			let bosmerPerk  = xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_BosmerRacialProficiencyPerk'));
			
			/* If the user distributes racial perk, add the dummy perk to the Player ref. A quest/script runs once after character creation that
			  checks if the player has the dummy perk. If so it will add the approrpriate racial perk to them.
			*/
			locals.dummyPerk = xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_DummyPerk'));
			locals.addedDummy = false;
			

			locals.racialPerks = {
				'ArgonianRace': argonianPerk,
                'ArgonianRaceVampire': argonianPerk,
                'DarkElfRace': darkPerk,
                'DarkElfRaceVampire':darkPerk,
                'ImperialRace': imperialPerk,
                'ImperialRaceVampire': imperialPerk,
				'NordRace' : nordPerk,
                'NordRaceVampire': nordPerk,
                'OrcRace': orcPerk,
                'OrcRaceVampire': orcPerk,
                'RedguardRace': redguardPerk,
                'RedguardRaceVampire': redguardPerk,
                'WoodElfRace': bosmerPerk,
                'WoodElfRaceVampire': bosmerPerk
			};
			
			locals.factionPerks = {
				'CWImperialFaction': xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_ImperialSoldierFactionProficiencyPerk')),
				'CWSonsFaction': xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_StormcloakFactionProficiencyPerk')),
				//'DraugrFaction': xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_DraugrFactionProficiencyPerk')),
				//'DremoraFaction': xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_DremoraFactionProficiencyPerk')),
				//'FalmerFaction': xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_FalmerFactionProficiencyPerk')),
				'ForswornFaction': xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_ForswornFactionProficiencyPerk')),
				'IsGuardFaction': xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_GuardsFactionProficiencyPerk')),
				'DLC1HunterFaction': xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_DawnguardFactionProficiencyPerk')),
				'ThalmorFaction': xelib.GetHexFormID(xelib.GetElement(actionSpeedX, 'ASX_ThalmorFactionProficiencyPerk'))
			};
			
			// default races to add perks to
			locals.availableRaces = [
				'ArgonianRace',
				'ArgonianRaceVampire',
				'BretonRace',
				'BretonRaceVampire',
				'DarkElfRace',
				'DarkElfRaceVampire',
				'DremoraRace',
				'ElderRace',
				'ElderRaceVampire',
				'HighElfRace',
				'HighElfRaceVampire',
				'ImperialRace',
				'ImperialRaceVampire',
				'KhajiitRace',
				'KhajiitRaceVampire',
				'NordRace',
				'NordRaceVampire',
				'OrcRace',
				'OrcRaceVampire',
				'RedguardRace',
				'RedguardRaceVampire',
				'WoodElfRace',
				'WoodElfRaceVampire'
			];
			
			/*let creatureRaces = [
				"DLC1BlackSkeletonRace",
				"DLC1SoulCairnSkeletonArmorRace",
				"DLC1SoulCairnSkeletonNecroRace",
				"DLC1TrollFrostRaceArmored",
				"DLC1TrollRaceArmored",
				"DLC2HulkingDraugrRace",
				"DraugrRace",
				"FalmerFrozenVampRace",
				"FalmerRace",
				"GiantRace",
				"RigidSkeletonRace",
				"SkeletonArmorRace",
				"DraugrMagicRace",
				"SkeletonNecroRace"
			];*/
			
			//if (settings.allowCreatures) {
			//	locals.availableRaces.push(...creatureRaces);
			//}
			
			// check for perk mods
			locals.patchVokrii = false;
			locals.vokriiAbilitiesToPatch = [VOKRII_ARENALINE, VOKRI_WARD_DANCER, VOKRI_WINDRUNNER];
			if (xelib.FileByName('Vokrii - Minimalistic Perks of Skyrim.esp') != 0) {
				helpers.logMessage('Vokrii detected. Windrunner and WardDancer perks will be nerfed into the ground :)');
				locals.patchVokrii = true;
			}
			
			locals.patchAdamant = false;
			locals.adamantAbilitiesToPatch = [ADAMANT_AGILITY1, ADAMANT_AGILITY2, ADAMANT_ATHLETICS1, ADAMANT_ATHLETICS2, ADAMANT_AKATOSH];
			if (xelib.FileByName('Adamant.esp') != 0) {
				helpers.logMessage('Adamant detected. Agility and Endurance perks will be nerfed into the ground :)');
				locals.patchAdamant = true;
			}
			
			
			locals.patchOrdinator = false;
			locals.ordinatorAbilitiesToPatch = [ORDINATOR_FLIGHT, ORDINATOR_WINDRUNNER, ORDINATOR_WINDBORNE];
			if (xelib.FileByName('Ordinator - Perks Of Skyrim.esp') != 0) {
				helpers.logMessage('Ordinator detected. Windrunner and Fight or Flight perks will be nerfed into the ground :)');
				locals.patchOrdinator = true;
			}
			
			
        },
        process: [{
			/*We need to rebalance perk mods that give insane movement bonuses for no reason*/
			load: {
				signature: 'SPEL',
				filter: function(record) {
					if (!settings.balancePerks) {
						return false;
					}
					let recordId = xelib.GetValue(record, 'EDID');
					if (locals.patchVokrii) {
						return (locals.vokriiAbilitiesToPatch.includes(recordId));
					}
					if (locals.patchAdamant) {
						return (locals.adamantAbilitiesToPatch.includes(recordId));
					}
					if (locals.patchOrdinator) {
						return locals.ordinatorAbilitiesToPatch.includes(recordId);
					}
					return false;
				}
			},
			patch: function (record){
				let recordId = xelib.GetValue(record, 'EDID');
				
				if (locals.patchOrdinator) {
					if (recordId == ORDINATOR_WINDRUNNER || recordId == ORDINATOR_WINDBORNE && settings.moveSpeed) {
						xelib.SetValue(xelib.GetElements(record, 'Effects')[0], 'EFIT - \\Magnitude', '1.000000');
					}
					else if (recordId == ORDINATOR_FLIGHT && settings.staminaRegen) {
						xelib.SetValue(xelib.GetElements(record, 'Effects')[1], 'EFIT - \\Magnitude', '3.000000');
					}
				}
				
				if (locals.patchVokrii) {
					if (recordId == VOKRI_WINDRUNNER && settings.moveSpeed) {
						xelib.SetValue(xelib.GetElements(record, 'Effects')[0], 'EFIT - \\Magnitude', '1.000000');
					}
					else if (recordId == VOKRI_WARD_DANCER && settings.moveSpeed) {
						xelib.SetValue(xelib.GetElements(record, 'Effects')[2], 'EFIT - \\Magnitude', '1.000000');
					}
					else if (recordId == VOKRII_ARENALINE && settings.moveSpeed) {
						xelib.SetValue(xelib.GetElements(record, 'Effects')[0], 'EFIT - \\Magnitude', '4.000000');
					}
				}
				
				if (locals.patchAdamant && settings.moveSpeed) {
					xelib.SetValue(xelib.GetElements(record, 'Effects')[0], 'EFIT - \\Magnitude', '1.000000');
				}
			}
		},
				
		{
			// add Keywords to all heavy/lightarmors
            load: {
                signature: 'ARMO',
                filter: function(record) {
					
					let armorType = xelib.GetValue(record, 'BOD2\\Armor Type');
					let recordId = xelib.GetValue(record, 'EDID');
					//helpers.logMessage(recordId + ' has body type: ' + armorType);
					if (recordId == null || !recordId) {
						return false;
				    }
                    
                    return armorType != "Clothing";
                }
            },
            patch: function (record) {
                /*
				Look at the Body template as opposed to keywords for the type because some armors 'mix' light and heavy material keywords *cough* Armory of tamriel :| *cough*
				*/
                let recordId = xelib.GetValue(record, 'EDID');
				 
				try {
					let armorType = xelib.GetValue(record, 'BOD2\\Armor Type');
					//helpers.logMessage(recordId + ' is being looked at with type: ' + armorType);
					let keyStore = null; // determine which keys to use. This will be pointed at the dict containing array of armorslot key words
					let armorSlot = null; // gloves,boots etc
					let tier = -1; // index in the keystore to use. This is set when iterating through armorRanks.
					let descLookup = null;
					if (armorType == 'Light Armor') {
						keyStore = locals.lightSlots;
						descLookup = LIGHT;
					}
					else if (armorType == 'Heavy Armor') {
						keyStore = locals.heavySlots;
						descLookup = HEAVY;
					}
					else {
						//wtf
						return;
					}

					helpers.logMessage("Evaluating record: " + recordId);
					
					/* We want to grab the highest material tier as some items can have multiple material keywrods
					   Loop over the armorRankings(see armor_materials.json) and check the current armors keywords for a match.
					   Item.key = int/str, item.val=List(armor material strings)
					*/
					for(var armorMaterial in locals.armorRanks) {
						if (xelib.HasKeyword(record, armorMaterial) && tier < parseInt(locals.armorRanks[armorMaterial])) {
							tier = locals.armorRanks[armorMaterial];
						}	
					}
					
					if (tier < 0 ) {
						helpers.logMessage("No recognized material type for " + recordId + ". Skipping");
						return;
					
					}
					else {
						tier -= 1;
					}
					
					if (xelib.HasKeyword(record, 'ArmorBoots')) {
						helpers.logMessage(recordId + " is boots");
						armorSlot = BOOTS;
					}
					else if(xelib.HasKeyword(record, 'ArmorCuirass')) {
						helpers.logMessage(recordId + " is cuirass");
						armorSlot = CUIRASS;
					}
					else if (xelib.HasKeyword(record, 'ArmorHelmet')) {
						helpers.logMessage(recordId + " is helmet");
						armorSlot = HELMET;
					}
					else if (xelib.HasKeyword(record, 'ArmorGauntlets')) {
						helpers.logMessage(recordId + " is gauntlets");
						armorSlot = GAUNTLETS;
					}
					else if (xelib.HasKeyword(record, 'ArmorShield')) {
						helpers.logMessage(recordId + " is shield");
						armorSlot = SHIELD;
					}
					else {
						helpers.logMessage(recordId + " has no avaible slot");
						return;
					}
					
					xelib.AddKeyword(record, keyStore[armorSlot][tier]);
					helpers.logMessage(recordId + ': addded armor keywords successfully');   
					// set descriptions. Shield/Boots share the same descriptions. as well as Gauntlets/Helmet
					if (!settings.descriptions) {
						return;
					}
					
					if (armorSlot == SHIELD) {
						armorSlot = BOOTS;
					}
					if (armorSlot == HELMET) {
						armorSlot = GAUNTLETS;
					}
					
					
					let descArray = {
						[RATTACK_SPEED]: settings.rangedSpeed,
						[ATTACK_SPEED]: settings.attackSpeed,
						[MOVE_SPEED]: settings.moveSpeed,
						[SPELL_COST]: settings.spellCosts,
						[STAMINA]: settings.staminaRegen,
						[MAGICKA]: settings.magickaRegen,
						[POWER_ATTACKS]: settings.powerAttacks
					};
					
					let newDescription = '';
					for (var descripType in descArray) {
						if (descArray[descripType]) {
							// This is so ugly....
							// If only I cared about js ;)
							newDescription += locals.effectDescriptions[descripType].replace("{", locals.effectMagnitudes[armorSlot][descripType][descLookup][tier]);

						}
					}
					let armorDescription = xelib.GetValue(record, 'DESC')
					if (armorDescription == '') {
						xelib.SetValue(record, 'DESC', newDescription);
					}
					else {
						xelib.SetValue(record, 'DESC', armorDescription + newDescription);
					}
				}catch(err) {
				  helpers.logMessage(`Could not process armor record ${recordId}: ${err.getMessage()}`)
				}
				
            }
		}
		,{
			// add perks to all npcs with the race_name defined above
            load: {
                signature: 'NPC_',
                filter: function(record) {
                    let dum = xelib.GetEnabledFlags(record, 'ACBS - Configuration\\Template Flags');
                    if (dum.includes("Use Spell List")) { // use spell list means it will inherit the perks from the template it inherits
                        return false;
                    }

                    if (xelib.HasKeyword(record, 'ActorTypeGhost')) {
                        return false;
                    }
                    
                    let raceName = xelib.GetValue(record, 'RNAM').split(' ')[0];
                    if (locals.availableRaces.includes(raceName)) {
                        return true;
                    }
					
                    
                    return false;
                }
            },
            patch: function (record) {
                // add the armor perks to all these records
				
				let recordId = xelib.GetValue(record, 'EDID');
				try {
					helpers.logMessage(recordId + ': adding action perks');
					locals.perksToAppy.forEach(perk => {
						xelib.AddPerk(record, perk, '1');
					})
					
					// add races to everyone but player. Default player race gets assigned nord perk if we dont
					if (settings.racialAbilities) {
						let raceName = xelib.GetValue(record, 'RNAM').split(' ')[0];
						if (raceName in locals.racialPerks) {
							if (recordId != "Player") {
								xelib.AddPerk(record, locals.racialPerks[raceName], '1');
							}
							// add dummy perk. During race selection a quest will run to assign the players racial perk and remove this..
							if (recordId == "Player" && !locals.addedDummy) {
								xelib.AddPerk(record, locals.dummyPerk, '1');
								locals.addedDummy = true;
							}
						}
					}
					
					//loop over factions and pull perk from dictionary
					if (settings.allowFactions) {
						
						if (!xelib.HasElement(record, "Factions")) {
							helpers.logMessage(recordId + " has no faction data");
							return;
						}
					
						let factions = xelib.GetElements(record, 'Factions');
						factions.forEach(faction => {
							
							let factionName = xelib.GetValue(faction, 'Faction').split(' ')[0];;
							if (factionName in locals.factionPerks) {
								xelib.AddPerk(record, locals.factionPerks[factionName], '1');
							}
						});   
					}
				} catch(err) {
				  helpers.logMessage(`Could not process npc record ${recordId}: ${err.getMessage()}`)
				}
            }
        }],
        finalize: function() {
            // Optional function, omit if empty.
        }
    })
}); //congratulations. You've managed to read through 647 lines of javashit. You should be running the synthesis patcher instead