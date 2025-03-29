import { DisplaySlotId, system, world } from "@minecraft/server";

export default class ScoreBoarder {

    /** @type {import("@minecraft/server").ScoreboardObjective} */
    #scoreboard = undefined;

    /** @type {number} */
    default = 0;

    /**
     * @param {string} name - ScoreName (If invalid, create a new scoreboard) 
     * @param {string} [displayName]
     */
    constructor(name, displayName) {

        const addScoreboardObjective = () => {
            this.#scoreboard = world.scoreboard.getObjective(name);
            if (!this.#scoreboard && name.length > 0) this.#scoreboard = world.scoreboard.addObjective(name, displayName);
        }

        try { addScoreboardObjective(); } catch { system.run(addScoreboardObjective) };
    };

    /**
     * Set score to DisplaySlot
     * @param {"Belowname" | "Sidebar"} mode 
     * @param {import("@minecraft/server").ObjectiveSortOrder} [sort]
     */
    setDisplay(mode, sort) {
        world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId[mode], { objective: this.#scoreboard, sortOrder: sort });
    }

    /**
     * @typedef {Array<import("@minecraft/server").Entity | import("@minecraft/server").Player | import("@minecraft/server").ScoreboardIdentity> | import("@minecraft/server").Entity | import("@minecraft/server").Player | import("@minecraft/server").ScoreboardIdentity | string} Targets
     */

    /**
     * @typedef {import("@minecraft/server").Entity | import("@minecraft/server").Player | import("@minecraft/server").ScoreboardIdentity | string} Target
     */


    /**
     * Add score to targets
     * @param {Targets} targets
     * @param {number} score 
     */
    add(targets, score) {
        for (const target of [targets].flat()) this.#scoreboard.addScore(target, score);
    };

    /**
     * Remove score to targets
     * @param {Targets} targets
     * @param {number} score 
     */
    remove(targets, score) {
        for (const target of [targets].flat()) this.#scoreboard.addScore(target, -score);
    };

    /**
     * Multiply score to targets
     * @param {Targets} targets
     * @param {number} score 
     */
    multiply(targets, score) {
        for (const target of [targets].flat()) {
            this.#scoreboard.setScore(target, (this.#scoreboard.getScore(target) || 0) * score);
        }
    }

    /**
     * Divide score to targets
     * @param {Targets} targets
     * @param {number} score 
     * @param {"ceil" | "floor" | "round"} [mode] @default "ceil"
     */
    divide(targets, score, mode = "floor") {
        for (const target of [targets].flat()) {
            this.#scoreboard.setScore(
                target,
                Math[mode]((this.#scoreboard.getScore(target) || 0) / score)
            );
        }
    }

    /**
     * Randomly score add to targets
     * @param {Targets} targets
     * @param {{ max: number, min: number }} range 
     * @param {boolean} [each] - Each adds a random score to the target.
     */
    random(targets, range, each) {
        if (each) {
            for (const target of [targets].flat()) {
                this.#scoreboard.setScore(target, Math.floor(Math.random() * (range.max - range.min + 1)) + range.min);
            }
        } else {
            const randomScore = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
            for (const target of [targets].flat()) {
                this.#scoreboard.setScore(target, randomScore);
            }
        }
    }

    /**
     * Reset score to targets
     * @param {Targets} targets
     */
    reset(targets) {
        for (const target of [targets].flat()) {
            this.#scoreboard.removeParticipant(target);
        }
    };

    /**
     * Set score to targets
     * @param {Targets} targets
     * @param {number} score 
     */
    set(targets, score) {
        for (const target of [targets].flat()) {
            this.#scoreboard.setScore(target, score);
        }
    };

    /**
     * Delete to scoreboard
     */
    delete() {
        world.scoreboard.removeObjective(this.#scoreboard);
    };

    /**
     * @overload
     * @param {Targets} target
     * @returns {Map<Targets,Number>}
     */
    /**
     * @overload
     * @param {Target} target
     * @returns {number}
     */
    /**
     * Get score to targets
     * @param {Target | Targets} target
     * @returns {number | Map<Targets,Number>}
     */
    get(target) {
        if (Array.isArray(target)) {
            const ScoreTargetsMap = new Map();

            target.flat().map(target =>
                ScoreTargetsMap.set(
                    target,
                    this.#scoreboard.getScore(target) || this.default
                )
            );

            return ScoreTargetsMap;
        } else {
            try {
                return this.#scoreboard.getScore(target) ?? this.default
            } catch {
                return this.default;
            }
        }
    };

    /**
     * Get score to targets
     * @param {Target} target
     * @param {boolean} [separator]
     * @returns {string}
     */
    getString(target, separator) {
        try {
            return separator ? String(this.#scoreboard.getScore(target) || this.default).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : String(this.#scoreboard.getScore(target) || this.default)
        } catch {
            return `${this.default}`;
        }
    };
}
