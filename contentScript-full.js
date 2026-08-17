// ==UserScript==
// @name         autodarts → n01 (no app)
// @namespace    autodarts-bridge
// @version      0.3.202608131935
// @description  Enters turns into n01 or DartCounter, reading the Autodarts board directly - nothing to run beside the browser. Starts in dry-run. Build 202608131935-4954d12
// @match        https://n01darts.com/n01/web/*
// @match        https://n01darts.com/n01/online/n01.php*
// @match        https://n01darts.com/n01/tournament/n01_live.php*
// @match        https://n01darts.com/n01/tournament/n01_online.php*
// @match        https://n01darts.com/n01/league/n01_live.php*
// @match        https://n01darts.com/n01/league/n01_online.php*
// @match        https://nakka.com/n01/web/*
// @match        https://nakka.com/n01/online/n01.php*
// @match        https://nakka.com/n01/tournament/n01_live.php*
// @match        https://nakka.com/n01/tournament/n01_online.php*
// @match        https://nakka.com/n01/league/n01_live.php*
// @match        https://nakka.com/n01/league/n01_online.php*
// @match        https://app.dartcounter.net/*
// @connect      localhost
// @connect      127.0.0.1
// @connect      opendartboard.local
// @connect      *
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @run-at       document-idle
// @noframes
// ==/UserScript==

"use strict";
(() => {
  // sink/core/checkout.ts
  var CHECKOUTS = [
    { score: 170, three: ["T20", "T20", "BULL"], two: null, one: null },
    { score: 169, three: null, two: null, one: null },
    { score: 168, three: null, two: null, one: null },
    { score: 167, three: ["T20", "T19", "BULL"], two: null, one: null },
    { score: 166, three: null, two: null, one: null },
    { score: 165, three: null, two: null, one: null },
    { score: 164, three: ["T20", "T18", "BULL"], two: null, one: null },
    { score: 163, three: null, two: null, one: null },
    { score: 162, three: null, two: null, one: null },
    { score: 161, three: ["T20", "T17", "BULL"], two: null, one: null },
    { score: 160, three: ["T20", "T20", "D20"], two: null, one: null },
    { score: 159, three: null, two: null, one: null },
    { score: 158, three: ["T20", "T20", "D19"], two: null, one: null },
    { score: 157, three: ["T20", "T19", "D20"], two: null, one: null },
    { score: 156, three: ["T20", "T20", "D18"], two: null, one: null },
    { score: 155, three: ["T20", "T19", "D19"], two: null, one: null },
    { score: 154, three: ["T20", "T18", "D20"], two: null, one: null },
    { score: 153, three: ["T20", "T19", "D18"], two: null, one: null },
    { score: 152, three: ["T20", "T20", "D16"], two: null, one: null },
    { score: 151, three: ["T20", "T17", "D20"], two: null, one: null },
    { score: 150, three: ["T20", "T18", "D18"], two: null, one: null },
    { score: 149, three: ["T20", "T19", "D16"], two: null, one: null },
    { score: 148, three: ["T20", "T16", "D20"], two: null, one: null },
    { score: 147, three: ["T20", "T17", "D18"], two: null, one: null },
    { score: 146, three: ["T20", "T18", "D16"], two: null, one: null },
    { score: 145, three: ["T20", "T15", "D20"], two: null, one: null },
    { score: 144, three: ["T20", "T20", "D12"], two: null, one: null },
    { score: 143, three: ["T20", "T17", "D16"], two: null, one: null },
    { score: 142, three: ["T20", "T14", "D20"], two: null, one: null },
    { score: 141, three: ["T20", "T19", "D12"], two: null, one: null },
    { score: 140, three: ["T20", "T16", "D16"], two: null, one: null },
    { score: 139, three: ["T19", "T14", "D20"], two: null, one: null },
    { score: 138, three: ["T20", "T18", "D12"], two: null, one: null },
    { score: 137, three: ["T19", "T16", "D16"], two: null, one: null },
    { score: 136, three: ["T20", "T20", "D8"], two: null, one: null },
    { score: 135, three: ["T20", "T17", "D12"], two: null, one: null },
    { score: 134, three: ["T20", "T14", "D16"], two: null, one: null },
    { score: 133, three: ["T20", "T19", "D8"], two: null, one: null },
    { score: 132, three: ["T20", "T16", "D12"], two: null, one: null },
    { score: 131, three: ["T20", "T13", "D16"], two: null, one: null },
    { score: 130, three: ["T20", "T20", "D5"], two: null, one: null },
    { score: 129, three: ["T19", "T16", "D12"], two: null, one: null },
    { score: 128, three: ["T18", "T14", "D16"], two: null, one: null },
    { score: 127, three: ["T20", "T17", "D8"], two: null, one: null },
    { score: 126, three: ["T19", "T19", "D6"], two: null, one: null },
    { score: 125, three: ["25", "T20", "D20"], two: null, one: null },
    { score: 124, three: ["T20", "T16", "D8"], two: null, one: null },
    { score: 123, three: ["T19", "T16", "D9"], two: null, one: null },
    { score: 122, three: ["T18", "T20", "D4"], two: null, one: null },
    { score: 121, three: ["T17", "T10", "D20"], two: null, one: null },
    { score: 120, three: ["T20", "20", "D20"], two: null, one: null },
    { score: 119, three: ["T19", "T10", "D16"], two: null, one: null },
    { score: 118, three: ["T20", "18", "D20"], two: null, one: null },
    { score: 117, three: ["T20", "17", "D20"], two: null, one: null },
    { score: 116, three: ["T20", "16", "D20"], two: null, one: null },
    { score: 115, three: ["T20", "15", "D20"], two: null, one: null },
    { score: 114, three: ["T20", "14", "D20"], two: null, one: null },
    { score: 113, three: ["T20", "13", "D20"], two: null, one: null },
    { score: 112, three: ["T20", "12", "D20"], two: null, one: null },
    { score: 111, three: ["T20", "19", "D16"], two: null, one: null },
    { score: 110, three: ["T20", "18", "D16"], two: ["T20", "BULL"], one: null },
    { score: 109, three: ["T19", "20", "D16"], two: null, one: null },
    { score: 108, three: ["T20", "16", "D16"], two: null, one: null },
    { score: 107, three: ["T19", "18", "D16"], two: ["T19", "BULL"], one: null },
    { score: 106, three: ["T20", "14", "D16"], two: null, one: null },
    { score: 105, three: ["T19", "16", "D16"], two: null, one: null },
    { score: 104, three: ["T18", "18", "D16"], two: ["T18", "BULL"], one: null },
    { score: 103, three: ["T20", "3", "D20"], two: null, one: null },
    { score: 102, three: ["T20", "10", "D16"], two: null, one: null },
    { score: 101, three: ["T20", "1", "D20"], two: ["T17", "BULL"], one: null },
    { score: 100, three: ["T20", "D20"], two: ["T20", "D20"], one: null },
    { score: 99, three: ["T19", "10", "D16"], two: null, one: null },
    { score: 98, three: ["T20", "D19"], two: ["T20", "D19"], one: null },
    { score: 97, three: ["T19", "D20"], two: ["T19", "D20"], one: null },
    { score: 96, three: ["T20", "D18"], two: ["T20", "D18"], one: null },
    { score: 95, three: ["T19", "D19"], two: ["T19", "D19"], one: null },
    { score: 94, three: ["T18", "D20"], two: ["T18", "D20"], one: null },
    { score: 93, three: ["T19", "D18"], two: ["T19", "D18"], one: null },
    { score: 92, three: ["T20", "D16"], two: ["T20", "D16"], one: null },
    { score: 91, three: ["T17", "D20"], two: ["T17", "D20"], one: null },
    { score: 90, three: ["T20", "D15"], two: ["T20", "D15"], one: null },
    { score: 89, three: ["T19", "D16"], two: ["T19", "D16"], one: null },
    { score: 88, three: ["T16", "D20"], two: ["T16", "D20"], one: null },
    { score: 87, three: ["T17", "D18"], two: ["T17", "D18"], one: null },
    { score: 86, three: ["T18", "D16"], two: ["T18", "D16"], one: null },
    { score: 85, three: ["T15", "D20"], two: ["T15", "D20"], one: null },
    { score: 84, three: ["T20", "D12"], two: ["T20", "D12"], one: null },
    { score: 83, three: ["T17", "D16"], two: ["T17", "D16"], one: null },
    { score: 82, three: ["T14", "D20"], two: ["T14", "D20"], one: null },
    { score: 81, three: ["T19", "D12"], two: ["T19", "D12"], one: null },
    { score: 80, three: ["T20", "D10"], two: ["T20", "D10"], one: null },
    { score: 79, three: ["T19", "D11"], two: ["T19", "D11"], one: null },
    { score: 78, three: ["T18", "D12"], two: ["T18", "D12"], one: null },
    { score: 77, three: ["T19", "D10"], two: ["T19", "D10"], one: null },
    { score: 76, three: ["T20", "D8"], two: ["T20", "D8"], one: null },
    { score: 75, three: ["T17", "D12"], two: ["T17", "D12"], one: null },
    { score: 74, three: ["T14", "D16"], two: ["T14", "D16"], one: null },
    { score: 73, three: ["T19", "D8"], two: ["T19", "D8"], one: null },
    { score: 72, three: ["T16", "D12"], two: ["T16", "D12"], one: null },
    { score: 71, three: ["T13", "D16"], two: ["T13", "D16"], one: null },
    { score: 70, three: ["T10", "D20"], two: ["T10", "D20"], one: null },
    { score: 69, three: ["T15", "D12"], two: ["T15", "D12"], one: null },
    { score: 68, three: ["T20", "D4"], two: ["T20", "D4"], one: null },
    { score: 67, three: ["T17", "D8"], two: ["T17", "D8"], one: null },
    { score: 66, three: ["T10", "D18"], two: ["T10", "D18"], one: null },
    { score: 65, three: ["T19", "D4"], two: ["T19", "D4"], one: null },
    { score: 64, three: ["T16", "D8"], two: ["T16", "D8"], one: null },
    { score: 63, three: ["T13", "D12"], two: ["T13", "D12"], one: null },
    { score: 62, three: ["T10", "D16"], two: ["T10", "D16"], one: null },
    { score: 61, three: ["T15", "D8"], two: ["T15", "D8"], one: null },
    { score: 60, three: ["20", "D20"], two: ["20", "D20"], one: null },
    { score: 59, three: ["19", "D20"], two: ["19", "D20"], one: null },
    { score: 58, three: ["18", "D20"], two: ["18", "D20"], one: null },
    { score: 57, three: ["17", "D20"], two: ["17", "D20"], one: null },
    { score: 56, three: ["16", "D20"], two: ["16", "D20"], one: null },
    { score: 55, three: ["15", "D20"], two: ["15", "D20"], one: null },
    { score: 54, three: ["14", "D20"], two: ["14", "D20"], one: null },
    { score: 53, three: ["13", "D20"], two: ["13", "D20"], one: null },
    { score: 52, three: ["20", "D16"], two: ["20", "D16"], one: null },
    { score: 51, three: ["19", "D16"], two: ["19", "D16"], one: null },
    { score: 50, three: ["18", "D16"], two: ["18", "D16"], one: "BULL" },
    { score: 49, three: ["17", "D16"], two: ["17", "D16"], one: null },
    { score: 48, three: ["16", "D16"], two: ["16", "D16"], one: null },
    { score: 47, three: ["15", "D16"], two: ["15", "D16"], one: null },
    { score: 46, three: ["6", "D20"], two: ["6", "D20"], one: null },
    { score: 45, three: ["13", "D16"], two: ["13", "D16"], one: null },
    { score: 44, three: ["12", "D16"], two: ["12", "D16"], one: null },
    { score: 43, three: ["11", "D16"], two: ["11", "D16"], one: null },
    { score: 42, three: ["10", "D16"], two: ["10", "D16"], one: null },
    { score: 41, three: ["9", "D16"], two: ["9", "D16"], one: null },
    { score: 40, three: ["D20"], two: ["D20"], one: "D20" },
    { score: 39, three: ["7", "D16"], two: ["7", "D16"], one: null },
    { score: 38, three: ["D19"], two: ["D19"], one: "D19" },
    { score: 37, three: ["5", "D16"], two: ["5", "D16"], one: null },
    { score: 36, three: ["D18"], two: ["D18"], one: "D18" },
    { score: 35, three: ["3", "D16"], two: ["3", "D16"], one: null },
    { score: 34, three: ["D17"], two: ["D17"], one: "D17" },
    { score: 33, three: ["1", "D16"], two: ["1", "D16"], one: null },
    { score: 32, three: ["D16"], two: ["D16"], one: "D16" },
    { score: 31, three: ["15", "D8"], two: ["15", "D8"], one: null },
    { score: 30, three: ["D15"], two: ["D15"], one: "D15" },
    { score: 29, three: ["13", "D8"], two: ["13", "D8"], one: null },
    { score: 28, three: ["D14"], two: ["D14"], one: "D14" },
    { score: 27, three: ["11", "D8"], two: ["11", "D8"], one: null },
    { score: 26, three: ["D13"], two: ["D13"], one: "D13" },
    { score: 25, three: ["9", "D8"], two: ["9", "D8"], one: null },
    { score: 24, three: ["D12"], two: ["D12"], one: "D12" },
    { score: 23, three: ["7", "D8"], two: ["7", "D8"], one: null },
    { score: 22, three: ["D11"], two: ["D11"], one: "D11" },
    { score: 21, three: ["5", "D8"], two: ["5", "D8"], one: null },
    { score: 20, three: ["D10"], two: ["D10"], one: "D10" },
    { score: 19, three: ["3", "D8"], two: ["3", "D8"], one: null },
    { score: 18, three: ["D9"], two: ["D9"], one: "D9" },
    { score: 17, three: ["1", "D8"], two: ["1", "D8"], one: null },
    { score: 16, three: ["D8"], two: ["D8"], one: "D8" },
    { score: 15, three: ["7", "D4"], two: ["7", "D4"], one: null },
    { score: 14, three: ["D7"], two: ["D7"], one: "D7" },
    { score: 13, three: ["5", "D4"], two: ["5", "D4"], one: null },
    { score: 12, three: ["D6"], two: ["D6"], one: "D6" },
    { score: 11, three: ["3", "D4"], two: ["3", "D4"], one: null },
    { score: 10, three: ["D5"], two: ["D5"], one: "D5" },
    { score: 9, three: ["1", "D4"], two: ["1", "D4"], one: null },
    { score: 8, three: ["D4"], two: ["D4"], one: "D4" },
    { score: 7, three: ["3", "D2"], two: ["3", "D2"], one: null },
    { score: 6, three: ["D3"], two: ["D3"], one: "D3" },
    { score: 5, three: ["1", "D2"], two: ["1", "D2"], one: null },
    { score: 4, three: ["D2"], two: ["D2"], one: "D2" },
    { score: 3, three: ["1", "D1"], two: ["1", "D1"], one: null },
    { score: 2, three: ["D1"], two: ["D1"], one: "D1" }
  ];
  var BY_SCORE = new Map(CHECKOUTS.map((entry) => [entry.score, entry]));
  function getCheckout(score, dartsLeft) {
    const entry = BY_SCORE.get(score);
    if (entry === void 0) return void 0;
    if (dartsLeft <= 1) return entry.one === null ? void 0 : [entry.one];
    if (dartsLeft === 2) return entry.two ?? void 0;
    return entry.three ?? void 0;
  }

  // sink/core/plan.ts
  var isRejection = (value2) => "reason" in value2;
  var finishingDart = (event) => [...event.darts].reverse().find((dart) => dart.score > 0);
  function planEntry(event, state) {
    if (state.ready !== void 0) return state.ready;
    const target = state.cell;
    const extra = state.warning === void 0 ? { target } : { target, warning: state.warning };
    const total = event.total;
    const bust = (why) => ({
      kind: "bust",
      total,
      expectedLeft: state.pointsLeft,
      why,
      ...extra
    });
    if (total > state.pointsLeft) return bust("over");
    if (total === state.pointsLeft) {
      const last = finishingDart(event);
      if (last === void 0 || last.segment.multiplier !== 2) return bust("not-a-double");
      return { kind: "checkout", total, darts: event.dartCount, ...extra };
    }
    if (state.pointsLeft - total === 1) return bust("leaves-one");
    return { kind: "score", total, expectedLeft: state.pointsLeft - total, ...extra };
  }

  // sink/core/sink.ts
  var SEQ_KEY = "n01-sink:last-seq";
  var RUN_KEY = "n01-sink:run-id";
  var Sink = class {
    #scorer;
    #storage;
    #log;
    #dryRun;
    #commitMode;
    #paused = false;
    #pauseReason = "";
    #lastSeq;
    #lastOutcome;
    /**
     * A committed turn nobody has confirmed yet, in `confirm` mode.
     *
     * Kept past the takeout on purpose: the board clears a second after committing, and a person who
     * pulled the darts before pressing the key would otherwise have nothing left to confirm. It is dropped
     * when the next turn's first dart lands, which is the last moment it can still be meant.
     */
    #pending;
    /** A turn entered by hand, waiting for the board's own commit to be consumed rather than entered. */
    #handEntered = false;
    #eventsSeen = 0;
    #turnsSeen = 0;
    /** Where n01 sat when the current turn's first dart landed. */
    #cellAtTurnStart;
    /**
     * n01's remaining score as last known: read at the first dart of a turn, and replaced by what n01
     * reports after an entry. Undefined until a turn starts, because guessing it would be worse than
     * showing nothing.
     */
    #left;
    #thrown = 0;
    #darts = 0;
    /**
     * This turn's score is already in n01. The darts stay in the board until somebody pulls them, so
     * without this the app's view of the board would be counted a second time - see `noteBoardTurn`.
     */
    #entered = false;
    constructor(options) {
      this.#scorer = options.scorer;
      this.#storage = options.storage;
      this.#log = options.log;
      this.#dryRun = options.dryRun ?? true;
      this.#commitMode = options.commitMode ?? "auto";
      const stored2 = Number(options.storage.read(SEQ_KEY) ?? "0");
      this.#lastSeq = Number.isInteger(stored2) && stored2 >= 0 ? stored2 : 0;
    }
    get dryRun() {
      return this.#dryRun;
    }
    get paused() {
      return this.#paused;
    }
    get pauseReason() {
      return this.#pauseReason;
    }
    get lastSeq() {
      return this.#lastSeq;
    }
    get lastOutcome() {
      return this.#lastOutcome;
    }
    /** Counters exist so the panel can prove events are arriving even when none are acted on. */
    get eventsSeen() {
      return this.#eventsSeen;
    }
    get turnsSeen() {
      return this.#turnsSeen;
    }
    /** Points in the board this turn, and how many darts made them. For the panel, not for scoring. */
    get turnScore() {
      return this.#thrown;
    }
    get turnDarts() {
      return this.#darts;
    }
    /** What is left to throw at right now: n01's remaining, less anything already in the board. */
    get pointsLeft() {
      return this.#left === void 0 ? void 0 : Math.max(0, this.#left - this.#thrown);
    }
    /** Darts still in hand this turn. Three to a turn; a takeout can leave it at zero. */
    get dartsLeft() {
      return Math.max(0, 3 - this.#darts);
    }
    /**
     * What the app says is in the board, corrections folded in.
     *
     * The board's own reading arrives through the event stream, but a correction is known only to the
     * app until the darts come out. Without this the panel would show a dart corrected to `T20` while
     * `left` was still counting the misread one - the two numbers a player reads off the panel would
     * disagree, which is the confusion the boxes exist to remove.
     *
     * Ignored once the turn has been entered: n01 has taken the score and the darts are still in the
     * board, so counting them again would subtract the turn twice.
     */
    noteBoardTurn(total, darts) {
      if (this.#entered) return;
      this.#thrown = total;
      this.#darts = darts;
    }
    /**
     * Re-reads what is left, for the panel and nothing else. Decides nothing and enters nothing.
     *
     * The scorer is otherwise read at the first dart of a turn and when the board clears, which was enough
     * while the next person to throw was always standing at the same board. It is not enough on DartCounter
     * against the DartBot: pulling the darts hands the turn to the computer, so the read at that moment
     * honestly reports *its* remaining - and then the computer throws in a window with no darts and no events
     * in it, and the panel is left showing the wrong player until the next dart lands.
     *
     * Called on a timer while the board is empty, which is exactly the window that used to go unwatched.
     */
    async refreshLeft() {
      const state = await this.#read();
      this.#left = state?.pointsLeft;
    }
    setDryRun(on) {
      this.#dryRun = on;
      this.#log(on ? "dry-run on - nothing will be entered" : "live - turns will be entered");
    }
    get commitMode() {
      return this.#commitMode;
    }
    setCommitMode(mode) {
      this.#commitMode = mode;
      if (mode === "auto") this.#pending = void 0;
      this.#log(mode === "auto" ? "turns are entered on takeout" : "turns are entered when you confirm them");
    }
    /** A committed turn waiting to be confirmed: its score, for the panel to put a key against. */
    get pending() {
      return this.#pending?.total;
    }
    /**
     * This turn's score is already in n01. The darts can still be in the board, so the panel needs this to
     * know that what it is showing has been dealt with - and must not go on offering it.
     */
    get entered() {
      return this.#entered;
    }
    pause(reason) {
      this.#paused = true;
      this.#pauseReason = reason;
      this.#log("paused", { reason });
    }
    resume() {
      this.#paused = false;
      this.#pauseReason = "";
      this.#log("resumed");
    }
    /**
     * The bridge lost events. There is no safe way to work out what was missed, so stop and say so.
     */
    onGap() {
      this.pause("the bridge reported a gap - enter the missing turns by hand, then resume");
    }
    /**
     * Which run of the bridge we are following. Called before its events.
     *
     * `seq` is only unique within one run of the app, but `#lastSeq` outlives page reloads - it has to,
     * or a reload mid-match could enter a turn twice. Restart the app and its counter begins again at 1,
     * so every new turn looks older than what we remember and is refused as already-processed. That is
     * not a hypothetical: it silently stopped scoring for a whole session once, and the only sign was
     * `skipped: already-processed` in the console.
     *
     * A new run means new numbers, and nothing to hold over: no turn from the old run can reappear.
     */
    onRun(runId, seq) {
      const known2 = this.#storage.read(RUN_KEY);
      if (known2 === runId) return;
      const upgrading = known2 === void 0 || known2 === "";
      if (upgrading && seq >= this.#lastSeq) {
        this.#storage.write(RUN_KEY, runId);
        return;
      }
      this.#storage.write(RUN_KEY, runId);
      this.#lastSeq = 0;
      this.#storage.write(SEQ_KEY, "0");
      this.#log("the app restarted, so its turn numbering begins again", { runId });
    }
    /** Running total for the panel. Kept here because the remaining score it feeds off lives here too. */
    #track(event) {
      if (event.type === "hello") {
        this.#darts = event.darts.length;
        this.#thrown = event.darts.reduce((total, dart) => total + dart.score, 0);
      } else if (event.type === "dart-thrown") {
        if (event.index === 0) {
          this.#darts = 0;
          this.#thrown = 0;
          this.#entered = false;
          this.#handEntered = false;
          if (this.#pending !== void 0) {
            this.#log("the turn waiting to be confirmed was dropped - the next turn has started");
            this.#pending = void 0;
          }
        }
        this.#darts += 1;
        this.#thrown += event.score;
      } else if (event.type === "turn-committed") {
        this.#darts = event.dartCount;
        this.#thrown = event.total;
      } else if (event.type === "turn-cleared") {
        this.#darts = 0;
        this.#thrown = 0;
        this.#entered = false;
      }
    }
    async handle(event) {
      this.#eventsSeen++;
      if (event.type === "turn-committed") this.#turnsSeen++;
      this.#track(event);
      const outcome = await this.#decide(event);
      const spent = outcome.act !== "failed" && outcome.act !== "awaiting-confirm";
      if (spent && event.type === "turn-committed" && event.seq > this.#lastSeq) {
        this.#lastSeq = event.seq;
        this.#storage.write(SEQ_KEY, String(event.seq));
      }
      const noise = outcome.act === "skipped" && outcome.rejection.reason === "not-a-turn";
      if (!noise) {
        this.#lastOutcome = outcome;
        if (outcome.act === "skipped") {
          this.#log(`skipped: ${outcome.rejection.reason}`, { detail: outcome.rejection.detail });
        }
      }
      return outcome;
    }
    /** The state, or nothing when the scorer would not say. Which of the two it was is its own business. */
    async #read() {
      const state = await this.#scorer.readState();
      return isRejection(state) ? void 0 : state;
    }
    async #decide(event) {
      if (event.type === "dart-thrown" && event.index === 0) {
        const state = await this.#read();
        this.#cellAtTurnStart = state?.cell;
        this.#left = state?.pointsLeft;
      }
      if (event.type === "turn-cleared" || event.type === "hello") {
        this.#left = (await this.#read())?.pointsLeft;
      }
      if (event.type !== "turn-committed") return { act: "skipped", rejection: { reason: "not-a-turn" } };
      if (event.seq <= this.#lastSeq) {
        return { act: "skipped", rejection: { reason: "already-processed", detail: `seq ${event.seq}` } };
      }
      if (this.#paused) return { act: "skipped", rejection: { reason: "paused", detail: this.#pauseReason } };
      if (this.#handEntered) {
        this.#handEntered = false;
        return { act: "skipped", rejection: { reason: "already-entered", detail: "you entered this turn yourself" } };
      }
      if (this.#commitMode === "confirm") {
        this.#pending = event;
        this.#log(`waiting for you to confirm ${event.total}`, { seq: event.seq });
        return { act: "awaiting-confirm", total: event.total, darts: event.dartCount };
      }
      return this.#enter(event);
    }
    /**
     * Enters a turn now, on somebody's say-so rather than the board's.
     *
     * This is the whole of `confirm` mode, and in `auto` mode it is a way to get on with it: the darts can
     * still be in the board. What goes in is what the panel is showing, which is what the person just
     * looked at and agreed with.
     */
    async enterNow(darts) {
      const waiting = this.#pending;
      const event = waiting ?? // No committed turn yet: the darts are still in the board, so build the turn from them. `seq 0`
      // never reaches the dedupe - `#handEntered` is what stops the board's own commit entering it again.
      {
        type: "turn-committed",
        ts: (/* @__PURE__ */ new Date()).toISOString(),
        seq: 0,
        darts: [...darts],
        total: darts.reduce((sum, dart) => sum + dart.score, 0),
        dartCount: darts.length
      };
      if (this.#paused) {
        const outcome2 = { act: "skipped", rejection: { reason: "paused", detail: this.#pauseReason } };
        this.#lastOutcome = outcome2;
        return outcome2;
      }
      if (event.dartCount === 0) {
        const outcome2 = { act: "skipped", rejection: { reason: "no-darts", detail: "nothing is in the board" } };
        this.#lastOutcome = outcome2;
        return outcome2;
      }
      const outcome = await this.#enter(event);
      if (outcome.act === "entered" || outcome.act === "awaiting") {
        this.#pending = void 0;
        if (waiting === void 0) this.#handEntered = true;
        else if (waiting.seq > this.#lastSeq) {
          this.#lastSeq = waiting.seq;
          this.#storage.write(SEQ_KEY, String(waiting.seq));
        }
      }
      this.#lastOutcome = outcome;
      return outcome;
    }
    async #enter(event) {
      const state = await this.#scorer.readState();
      if (isRejection(state)) return { act: "skipped", rejection: state };
      if (this.#cellAtTurnStart !== void 0 && state.cell !== this.#cellAtTurnStart) {
        return {
          act: "skipped",
          rejection: {
            reason: "cell-moved",
            detail: `was ${this.#cellAtTurnStart}, now ${state.cell} - someone entered this turn already`
          }
        };
      }
      const plan = planEntry(event, state);
      if (isRejection(plan)) return { act: "skipped", rejection: plan };
      if (plan.warning !== void 0) this.#log(plan.warning);
      if (this.#dryRun) {
        this.#log(`would enter ${plan.kind === "bust" ? "0 (bust)" : plan.total}`, { seq: event.seq, plan });
        return { act: "would-enter", plan };
      }
      const result = await this.#scorer.enter(plan);
      if (!result.ok) {
        this.pause(`n01 refused the entry: ${result.detail}`);
        return { act: "failed", plan, detail: result.detail };
      }
      if ("awaiting" in result) {
        this.#log(result.awaiting);
        return { act: "awaiting", plan, detail: result.awaiting };
      }
      if (plan.kind !== "checkout" && result.left !== plan.expectedLeft) {
        this.pause(`n01 shows ${result.left} left, expected ${plan.expectedLeft} - fix it by hand, then resume`);
        return { act: "failed", plan, detail: `left ${result.left} != ${plan.expectedLeft}` };
      }
      this.#left = result.left;
      this.#thrown = 0;
      this.#darts = 0;
      this.#entered = true;
      this.#log(`entered ${plan.kind === "bust" ? "0 (bust)" : plan.total}`, { seq: event.seq, left: result.left });
      return { act: "entered", plan, left: result.left };
    }
  };

  // src/board/types.ts
  var scoreOf = (segment) => segment.number * segment.multiplier;

  // src/corrections.ts
  var CorrectionError = class extends Error {
  };
  var RINGS = { S: 1, D: 2, T: 3, OUT: 0 };
  function toSegment(spec) {
    const { number, ring } = spec;
    if (!Number.isInteger(number)) throw new CorrectionError(`number must be a whole number, got ${number}`);
    if (!(ring in RINGS)) throw new CorrectionError(`ring must be S, D, T or OUT, got "${ring}"`);
    if (ring === "OUT") {
      if (number < 0 || number > 20) throw new CorrectionError(`a miss is 0 or 1\u201320, got ${number}`);
      return { name: number === 0 ? "Miss" : `M${number}`, number, bed: "Outside", multiplier: 0 };
    }
    if (number === 25) {
      if (ring === "T") throw new CorrectionError("there is no triple bull");
      return ring === "S" ? { name: "25", number: 25, bed: "Single", multiplier: 1 } : { name: "Bull", number: 25, bed: "Double", multiplier: 2 };
    }
    if (number < 1 || number > 20) throw new CorrectionError(`number must be 1\u201320, 25 or 0, got ${number}`);
    const bed = ring === "S" ? "Single" : ring === "D" ? "Double" : "Triple";
    return { name: `${ring}${number}`, number, bed, multiplier: RINGS[ring] };
  }
  function validateCorrection(correction, detectedCount, addedCount = 0) {
    if (correction.kind === "add") {
      toSegment(correction.segment);
      return;
    }
    if (correction.kind === "replace-added" || correction.kind === "remove-added") {
      if (!Number.isInteger(correction.at) || correction.at < 0) {
        throw new CorrectionError(`at must be 0 or more, got ${correction.at}`);
      }
      if (correction.at >= addedCount) {
        throw new CorrectionError(`there is no added dart ${correction.at} - ${addedCount} were added`);
      }
      if (correction.kind === "replace-added") toSegment(correction.segment);
      return;
    }
    if (!Number.isInteger(correction.index) || correction.index < 0) {
      throw new CorrectionError(`index must be 0 or more, got ${correction.index}`);
    }
    if (correction.index >= detectedCount) {
      throw new CorrectionError(`there is no dart ${correction.index} - the board shows ${detectedCount}`);
    }
    if (correction.kind === "replace") toSegment(correction.segment);
  }
  var toDart = (segment, index, from) => ({
    index,
    segment,
    score: scoreOf(segment),
    bouncer: from?.bouncer ?? false,
    // A corrected dart has no position: the board never located it where the person says it went.
    ...from?.coords === void 0 ? {} : { coords: from.coords }
  });
  function applyCorrections(detected, corrections) {
    const replacements = [];
    const removed = /* @__PURE__ */ new Set();
    const replaced = /* @__PURE__ */ new Map();
    for (const correction of corrections) {
      if (correction.kind === "remove") {
        removed.add(correction.index);
        replaced.delete(correction.index);
        continue;
      }
      if (correction.kind === "replace") {
        const original = detected[correction.index];
        if (original === void 0) continue;
        const to = toSegment(correction.segment);
        replaced.set(correction.index, to);
        removed.delete(correction.index);
        replacements.push({ index: correction.index, from: original.segment, to });
      }
    }
    const darts = [];
    const origins = [];
    for (const [index, entry] of detected.entries()) {
      if (removed.has(index)) continue;
      const override = replaced.get(index);
      darts.push(override === void 0 ? toDart(entry.segment, darts.length, entry) : toDart(override, darts.length));
      origins.push(index);
    }
    for (const correction of corrections) {
      if (correction.kind !== "add") continue;
      darts.push(toDart(toSegment(correction.segment), darts.length));
      origins.push(null);
    }
    return { darts, replacements, origins };
  }
  function finalReplacements(replacements) {
    const byIndex = /* @__PURE__ */ new Map();
    for (const replacement of replacements) {
      const existing = byIndex.get(replacement.index);
      byIndex.set(
        replacement.index,
        existing === void 0 ? replacement : { index: replacement.index, from: existing.from, to: replacement.to }
      );
    }
    return [...byIndex.values()].filter((replacement) => !sameSegment(replacement.from, replacement.to));
  }
  var sameSegment = (a, b) => a.name === b.name && a.number === b.number && a.bed === b.bed && a.multiplier === b.multiplier;

  // sink/core/slots.ts
  var SLOT_COUNT = 3;
  var blank = () => ({ label: "", score: 0, state: "empty", target: null });
  var isReplace = (correction) => correction.kind === "replace";
  function toSlots(snapshot) {
    const slots = [];
    if (snapshot !== void 0) {
      const corrected = new Set(snapshot.corrections.filter(isReplace).map((correction) => correction.index));
      let added = 0;
      for (const [position2, dart] of snapshot.darts.entries()) {
        const origin = snapshot.origins[position2] ?? null;
        if (origin === null) {
          slots.push({ label: dart.segment.name, score: dart.score, state: "added", target: { at: added++ } });
          continue;
        }
        const seen = snapshot.detected[origin];
        const changed = corrected.has(origin);
        slots.push({
          label: dart.segment.name,
          score: dart.score,
          state: changed ? "corrected" : dart.bouncer ? "bounced" : "detected",
          ...changed && seen !== void 0 ? { boardSaid: seen.segment.name } : {},
          target: { index: origin }
        });
      }
    }
    while (slots.length < SLOT_COUNT) slots.push(blank());
    return slots;
  }
  var slotTotal = (slots) => slots.reduce((total, slot) => total + slot.score, 0);
  var slotDarts = (slots) => slots.filter((slot) => slot.state !== "empty").length;

  // sink/core/turn.ts
  var asThrow = (dart) => ({
    segment: dart.segment,
    bouncer: dart.bouncer,
    ...dart.coords === void 0 ? {} : { coords: dart.coords }
  });
  var asDart = (entry, index) => ({
    index,
    segment: entry.segment,
    score: scoreOf(entry.segment),
    bouncer: entry.bouncer,
    ...entry.coords === void 0 ? {} : { coords: entry.coords }
  });
  var LocalTurn = class {
    /** What the board says is in it, in the board's own numbering. Never edited - see `#edits`. */
    #board = [];
    #edits = [];
    /**
     * The score has gone out. The darts are still in the board until somebody pulls them, so the boxes
     * stay up, but there is nothing left to correct here - n01 already has the number.
     */
    #committed = false;
    get slots() {
      return toSlots(this.#view());
    }
    /** The turn as it would be scored: what the boxes show, in the order they show it. */
    get darts() {
      return this.#darts();
    }
    get total() {
      return this.#darts().reduce((sum, dart) => sum + dart.score, 0);
    }
    get count() {
      return this.#darts().length;
    }
    /** Whether a person has had a hand in this turn, which is what makes their list the authority. */
    get edited() {
      return this.#edits.length > 0;
    }
    get committed() {
      return this.#committed;
    }
    /**
     * Follows the board, and hands back the event the sink should act on.
     *
     * For a committed turn with edits standing, that is not the event the app sent: the darts, total and
     * count are the person's. Everything else passes straight through.
     */
    observe(event) {
      switch (event.type) {
        case "dart-thrown":
          if (event.index === 0) this.#reset();
          if (event.index >= this.#board.length) this.#board.push(asThrow(event));
          else this.#board[event.index] = asThrow(event);
          return event;
        case "dart-corrected": {
          const seen = this.#board[event.index];
          if (seen !== void 0) this.#board[event.index] = { ...seen, segment: event.to.segment };
          return event;
        }
        case "hello":
          this.#reset();
          this.#board = event.darts.map(asThrow);
          return event;
        case "turn-cleared":
          this.#reset();
          return event;
        case "turn-committed": {
          this.#board = event.darts.map(asThrow);
          this.#committed = true;
          if (this.#edits.length === 0) return event;
          const darts = this.#darts();
          return {
            ...event,
            darts,
            total: darts.reduce((sum, dart) => sum + dart.score, 0),
            dartCount: darts.length
          };
        }
        default:
          return event;
      }
    }
    /**
     * The dart in box `position` was something else. An empty box means the board missed a dart, so this
     * adds one - the person pressing the key does not have to know the difference.
     */
    replace(position2, segment) {
      const target = this.slots[position2]?.target;
      if (target === void 0 || target === null) return this.add(segment);
      return "at" in target ? this.#edit({ kind: "replace-added", at: target.at, segment }) : this.#edit({ kind: "replace", index: target.index, segment });
    }
    /** There was no dart there at all - a bounce the board scored, or a phantom. */
    remove(position2) {
      const target = this.slots[position2]?.target;
      if (target === void 0 || target === null) return { ok: false, reason: "impossible", detail: "that box is empty" };
      return "at" in target ? this.#edit({ kind: "remove-added", at: target.at }) : this.#edit({ kind: "remove", index: target.index });
    }
    add(segment) {
      return this.#edit({ kind: "add", segment });
    }
    /** Back to what the board said, for when the correcting itself went wrong. */
    undo() {
      if (this.#committed) return { ok: false, reason: "committed" };
      this.#edits = [];
      return { ok: true };
    }
    /** What a page opened mid-turn has missed: `/poll` carries no hello, so the app is asked once. */
    seed(snapshot) {
      if (this.#committed || this.#edits.length > 0) return;
      this.#board = snapshot.detected.map(asThrow);
    }
    #edit(correction) {
      if (this.#committed) return { ok: false, reason: "committed" };
      const added = this.#edits.filter((edit) => edit.kind === "add");
      try {
        validateCorrection(correction, this.#board.length, added.length);
      } catch (error) {
        return { ok: false, reason: "impossible", detail: error instanceof Error ? error.message : String(error) };
      }
      if (correction.kind === "remove-added" || correction.kind === "replace-added") {
        const at = this.#edits.indexOf(added[correction.at]);
        if (correction.kind === "remove-added") this.#edits.splice(at, 1);
        else this.#edits[at] = { kind: "add", segment: correction.segment };
        return { ok: true };
      }
      this.#edits.push(correction);
      return { ok: true };
    }
    #reset() {
      this.#board = [];
      this.#edits = [];
      this.#committed = false;
    }
    #darts() {
      return applyCorrections(this.#board, this.#edits).darts;
    }
    #view() {
      const applied = applyCorrections(this.#board, this.#edits);
      return {
        darts: applied.darts,
        detected: this.#board.map(asDart),
        origins: applied.origins,
        corrections: this.#edits
      };
    }
  };

  // sink/dartcounter/bind.ts
  var wrap = (node) => ({
    get text() {
      return (node.textContent ?? "").replace(/\s+/g, " ").trim();
    },
    get visible() {
      const rect = node.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    },
    get label() {
      const tag = node.tagName.toLowerCase();
      const name = node.getAttribute("aria-label") ?? node.getAttribute("name") ?? "";
      return name === "" ? tag : `${tag}[${name}]`;
    },
    matches: (selector) => node.matches(selector),
    get parent() {
      return node.parentElement === null ? void 0 : wrap(node.parentElement);
    },
    closest: (selector) => {
      const found = node.closest(selector);
      return found === null ? void 0 : wrap(found);
    },
    query: (selector) => {
      const found = node.querySelector(selector);
      return found === null ? void 0 : wrap(found);
    },
    // `Array.from`, not a spread: the sink's lib list is ES2023 + DOM, and DOM.Iterable is what makes
    // a NodeList spreadable. Widening the lib for one line is not worth it.
    all: (selector) => Array.from(node.querySelectorAll(selector), wrap),
    get value() {
      return "value" in node ? String(node.value) : "";
    },
    set value(next) {
      if ("value" in node) node.value = next;
    },
    fire: (kind) => node.dispatchEvent(new Event(kind, { bubbles: true })),
    click: () => {
      if ("click" in node) node.click();
    },
    press: (key) => {
      if ("focus" in node) node.focus();
      for (const type of ["keydown", "keyup"]) {
        node.dispatchEvent(
          new KeyboardEvent(type, { key, code: key, keyCode: key === "Enter" ? 13 : 0, which: key === "Enter" ? 13 : 0, bubbles: true })
        );
      }
    }
  });
  var pageQuery = (document2) => ({
    all: (selector) => Array.from(document2.querySelectorAll(selector), wrap),
    query: (selector) => {
      const found = document2.querySelector(selector);
      return found === null ? void 0 : wrap(found);
    },
    sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms))
  });

  // sink/ui/mark.ts
  var PANEL_MARK = "data-n01-sink";

  // sink/dartcounter/scorer.ts
  var SELECTORS = {
    /** Confirmed: two of them on a two-player screen, one per seat. */
    remaining: "app-remaining-score",
    /**
     * A seat is drawn as an unnamed `div` - both are `class="flex h-full w-full flex-col space-y-2"`, the
     * same down to the character - so it cannot be selected for. What marks it is what it *holds*: one face,
     * one remaining score and one name. So the adapter walks up from the score until it finds the face.
     */
    faces: "app-profile-picture, app-dartbot-profile-picture",
    /** Confirmed: the computer's seat carries its own kind of face. */
    dartbot: "app-dartbot-profile-picture",
    /** Confirmed: says "<name>'s turn to throw!". The app knows whose turn it is, so it need not be guessed. */
    turnInfo: "app-ingame-turn-info",
    /**
     * Where a turn total is typed, in order of how sure we are. Tried one at a time rather than as one
     * comma-separated selector, because a browser returns matches in document order and ignores the order
     * they were asked for - so a chat box further up the page would win over the numeric field.
     *
     * The first is confirmed: `app-keyboard-score-input` holds an `input[inputmode="numeric"]` with
     * `maxlength="3"` and the placeholder "Enter a score and press enter". The rest are there for the day
     * that component is renamed.
     */
    inputs: [
      "app-keyboard-score-input input",
      "app-match-score-input input",
      'input[inputmode="numeric"]',
      'input[type="number"]',
      'input[type="tel"]',
      'input:not([type="checkbox"]):not([type="radio"])'
    ],
    /** Confirmed: a **Submit** button sits beside the field, for when Enter alone is not enough. */
    submit: "app-match-score-input button, app-keyboard-score-input button",
    /** A question only a person can answer, which is what a finish turns into. */
    dialog: '[role="dialog"], dialog, [class*="modal"]'
  };
  var PANEL_DEPTH = 14;
  var TURN = /^(.+?)'s turn to throw/;
  var DARTS_THROWN = /darts thrown\s*(\d+)/i;
  var CONFIRM_MS = 1500;
  var CONFIRM_STEP_MS = 100;
  var UNREADABLE = {
    reason: "no-dc-state",
    detail: "cannot read a remaining score - is a game open?"
  };
  var NO_INPUT = {
    reason: "no-input",
    detail: "no score field on this screen"
  };
  var ours = (element) => element.closest(`[${PANEL_MARK}]`) !== void 0;
  var numberIn = (text3) => {
    const found = /\d+/.exec(text3);
    return found === null ? void 0 : Number(found[0]);
  };
  var AMBIGUOUS = {
    reason: "no-dc-state",
    detail: "cannot tell whose turn it is"
  };
  function activeSeat(seats) {
    const named = seats.filter((seat) => seat.named);
    if (named.length === 1) return named[0];
    if (seats.length === 1) return seats[0];
    const [first, second] = [...seats].sort((a, b) => (a.dartsThrown ?? Infinity) - (b.dartsThrown ?? Infinity));
    if (first?.dartsThrown === void 0) return void 0;
    return first.dartsThrown < (second?.dartsThrown ?? Infinity) ? first : void 0;
  }
  var DomDartCounter = class {
    #page;
    constructor(page) {
      this.#page = page;
    }
    async readState() {
      const seats = this.#seats();
      if (seats.length === 0) return UNREADABLE;
      const seat = activeSeat(seats);
      if (seat === void 0) return AMBIGUOUS;
      const state = {
        pointsLeft: seat.pointsLeft,
        // The seat plus what it is on: if somebody types the turn by hand between the first dart and the
        // takeout, the remaining changes, this stops matching, and the sink refuses instead of overwriting.
        cell: `s${seat.index}/${seat.pointsLeft}`
      };
      if (seat.isBot) {
        return { ...state, ready: { reason: "computer-seat", detail: `seat ${seat.index} is the DartBot` } };
      }
      if (this.#input() === void 0) return { ...state, ready: NO_INPUT };
      return state;
    }
    async enter(plan) {
      const input = this.#input();
      if (input === void 0) return { ok: false, detail: NO_INPUT.detail ?? "no score field" };
      const value2 = plan.kind === "bust" ? 0 : plan.total;
      input.value = String(value2);
      input.fire("input");
      input.press("Enter");
      const landed = await this.#settle(plan, CONFIRM_STEP_MS);
      if (landed !== void 0) return landed;
      this.#page.query(SELECTORS.submit)?.click();
      const late = await this.#settle(plan, CONFIRM_MS);
      if (late !== void 0) return late;
      const now = this.#seats().map((seat) => seat.pointsLeft).join(", ");
      const expected = plan.kind === "checkout" ? "the leg to end" : String(plan.expectedLeft);
      return { ok: false, detail: `DartCounter still shows ${now === "" ? "nothing" : now}, expected ${expected}` };
    }
    /**
     * Waits for the screen to agree with the plan, and answers `undefined` while it does not.
     *
     * Reading it back is the only proof there is that the entry landed: the field is not ours, nothing
     * answers us, and a value assigned to an input that nobody was listening to looks identical to a score
     * accepted.
     */
    async #settle(plan, budgetMs) {
      for (let waited = 0; waited <= budgetMs; waited += CONFIRM_STEP_MS) {
        await this.#page.sleep(CONFIRM_STEP_MS);
        if (plan.kind === "checkout") {
          const dialog = this.#page.query(SELECTORS.dialog);
          if (dialog !== void 0 && dialog.visible) {
            return { ok: true, awaiting: `confirm the ${plan.total} checkout in DartCounter (${plan.darts} darts)` };
          }
          if (!this.#seats().some((seat) => seat.pointsLeft === plan.total)) return { ok: true, left: 0 };
          continue;
        }
        if (this.#seats().some((seat) => seat.pointsLeft === plan.expectedLeft)) {
          return { ok: true, left: plan.expectedLeft };
        }
      }
      return void 0;
    }
    /** Every remaining score on screen, with what can be worked out about the seat it belongs to. */
    #seats() {
      const throwing = this.#throwing();
      return this.#page.all(SELECTORS.remaining).filter((element) => element.visible).flatMap((score, index) => {
        const pointsLeft = numberIn(score.text);
        if (pointsLeft === void 0) return [];
        const panel = this.#panelOf(score);
        const text3 = panel.text;
        return [
          {
            pointsLeft,
            panel,
            index,
            dartsThrown: numberIn((DARTS_THROWN.exec(text3) ?? [])[1] ?? ""),
            isBot: panel.query(SELECTORS.dartbot) !== void 0,
            named: throwing !== void 0 && text3.includes(throwing)
          }
        ];
      });
    }
    /** The name the app says is up, if it says it in a wording this recognises. */
    #throwing() {
      const info = this.#page.query(SELECTORS.turnInfo);
      if (info === void 0) return void 0;
      const found = TURN.exec(info.text);
      return found === null ? void 0 : found[1];
    }
    /**
     * The seat a score belongs to: the nearest ancestor that holds a face.
     *
     * By what it contains, not by what it is - the two seats are the same unnamed `div` with the same classes,
     * so there is nothing to select. Falls back to the score itself, which keeps the caller free of undefined
     * and costs only the name and the DartBot check.
     */
    #panelOf(score) {
      let at = score.parent;
      for (let up = 0; at !== void 0 && up < PANEL_DEPTH; at = at.parent, up++) {
        if (at.query(SELECTORS.faces) !== void 0) return at;
      }
      return score;
    }
    #input() {
      for (const selector of SELECTORS.inputs) {
        const found = this.#page.all(selector).find((element) => element.visible && !ours(element));
        if (found !== void 0) return found;
      }
      return void 0;
    }
  };

  // sink/n01/postmessage.ts
  var SILENT = {
    reason: "no-n01-state",
    detail: "n01 did not answer - a dialog may be open"
  };
  var cellOf = (data) => `p${data.selectPlayer}/r${data.selectRound}`;
  function judge(data) {
    const cell = cellOf(data);
    const state = (ready) => ({
      pointsLeft: data.pointsLeft,
      cell,
      ...ready === void 0 ? {} : { ready }
    });
    if (data.leftMode !== 0) {
      return state({ reason: "left-mode", detail: "n01 is asking for the remaining score, not the score thrown" });
    }
    if (data.computerSeats[data.selectPlayer] === true) {
      return state({ reason: "computer-seat", detail: `seat ${data.selectPlayer} is played by the computer` });
    }
    if (!data.selectedIsMine) {
      return state({ reason: "not-my-turn", detail: `seat ${data.selectPlayer} is the opponent's` });
    }
    if (data.selectRound !== data.currentRound) {
      return state({
        reason: "cursor-on-history",
        detail: `cursor on round ${data.selectRound}, game on round ${data.currentRound}`
      });
    }
    if (data.selectPlayer !== data.currentPlayer) {
      return {
        pointsLeft: data.pointsLeft,
        cell,
        warning: `cursor is on p${data.selectPlayer}, n01 expected p${data.currentPlayer}`
      };
    }
    return state(void 0);
  }
  var isRecord = (value2) => typeof value2 === "object" && value2 !== null;
  var GAME_OPTIONS_KEY = "gameOptions";
  var PostMessageN01 = class {
    #target;
    #timeoutMs;
    #storage;
    constructor(options) {
      this.#target = options.target;
      this.#timeoutMs = options.timeoutMs ?? 2e3;
      this.#storage = options.storage;
    }
    async readState() {
      const data = await this.#read();
      return data === void 0 ? SILENT : judge(data);
    }
    /** `setData` and `gameOptions`, flattened to the parts that decide anything. Adapter-private. */
    async #read() {
      const reply = await this.#exchange({ getSetData: true }, (data) => isRecord(data.setData));
      if (reply === void 0 || !isRecord(reply.setData)) return void 0;
      const setData = reply.setData;
      const legs = setData["legData"];
      const currentLeg = setData["currentLeg"];
      if (!Array.isArray(legs) || typeof currentLeg !== "number") return void 0;
      const leg = legs[currentLeg];
      if (!isRecord(leg)) return void 0;
      const currentPlayer = numberAt(leg, "currentPlayer");
      const currentRound = numberAt(leg, "currentRound");
      const selectPlayer = numberAt(leg, "selectPlayer");
      const selectRound = numberAt(leg, "selectRound");
      if (currentPlayer === void 0 || currentRound === void 0) return void 0;
      if (selectPlayer === void 0 || selectRound === void 0) return void 0;
      const pointsLeft = this.#leftAt(leg, selectPlayer, selectRound);
      if (pointsLeft === void 0) return void 0;
      return {
        currentPlayer,
        currentRound,
        selectPlayer,
        selectRound,
        pointsLeft,
        leftMode: numberAt(setData, "leftMode") ?? 0,
        computerSeats: this.#computerSeats(),
        selectedIsMine: isMine(setData, selectPlayer)
      };
    }
    async enter(plan) {
      const value2 = plan.kind === "bust" ? 0 : plan.total;
      this.#send({ score: value2 });
      if (plan.kind === "checkout") {
        const done = await this.#exchange({ finish: plan.darts }, (data) => data.score === -plan.darts);
        return done === void 0 ? { ok: true, awaiting: `confirm the ${plan.total} checkout in n01 (${plan.darts} darts)` } : { ok: true, left: 0 };
      }
      const recorded = await this.#exchange({ next: true }, (data) => data.score === value2);
      if (recorded === void 0) return { ok: false, detail: `n01 did not record ${value2}` };
      const left = typeof recorded.left === "number" ? recorded.left : void 0;
      return left === void 0 ? { ok: false, detail: "n01 reported no remaining score" } : { ok: true, left };
    }
    #computerSeats() {
      const raw = this.#storage?.getItem(GAME_OPTIONS_KEY);
      if (raw === null || raw === void 0) return [false, false];
      try {
        const parsed = JSON.parse(raw);
        const com = isRecord(parsed) ? parsed["com"] : void 0;
        if (!Array.isArray(com)) return [false, false];
        return com.map((seat) => seat === 1 || seat === true);
      } catch {
        return [false, false];
      }
    }
    #leftAt(leg, player, round) {
      const players = leg["playerData"];
      if (!Array.isArray(players)) return void 0;
      const rounds = players[player];
      if (!Array.isArray(rounds)) return void 0;
      const cell = rounds[round];
      return isRecord(cell) ? numberAt(cell, "left") : void 0;
    }
    #send(payload) {
      this.#target.postMessage({ type: "n01-input", ...payload }, "*");
    }
    /** Sends one input message and waits for the first outbound message that matches. */
    #exchange(payload, matches) {
      return new Promise((resolve) => {
        const done = (value2) => {
          clearTimeout(timer);
          this.#target.removeEventListener("message", listener);
          resolve(value2);
        };
        const listener = (event) => {
          const data = event.data;
          if (!isRecord(data) || data["type"] !== "n01") return;
          if (matches(data)) done(data);
        };
        const timer = setTimeout(() => done(void 0), this.#timeoutMs);
        this.#target.addEventListener("message", listener);
        this.#send(payload);
      });
    }
  };
  function isMine(setData, player) {
    const stats = setData["statsData"];
    if (!Array.isArray(stats)) return true;
    const seat = stats[player];
    if (!isRecord(seat) || seat["me"] === void 0) return true;
    return seat["me"] === 1;
  }
  function numberAt(source, key) {
    const value2 = source[key];
    return typeof value2 === "number" && Number.isFinite(value2) ? value2 : void 0;
  }

  // src/events.ts
  var KNOWN_BOARD_STATUSES = [
    "Throw",
    "Takeout",
    "Takeout in progress",
    "Starting",
    "Stopping",
    "Stopped",
    "Calibrating",
    "Setup",
    "Error",
    "Offline"
  ];
  var KNOWN_BOARD_EVENTS = [
    "Started",
    "Starting",
    "Stopping",
    "Stopped",
    "Throw detected",
    "Takeout started",
    "Takeout finished",
    "Calibration started",
    "Calibration finished",
    "Calibration failed",
    "Manual reset",
    "Offline"
  ];
  var KNOWN_BEDS = [
    "Single",
    "SingleInner",
    "SingleOuter",
    "Double",
    "Triple",
    "Outside"
  ];

  // src/board/parse.ts
  var STATE_KEYS = /* @__PURE__ */ new Set(["connected", "running", "status", "event", "numThrows", "throws"]);
  var THROW_KEYS = /* @__PURE__ */ new Set(["segment", "coords", "bouncer"]);
  var SEGMENT_KEYS = /* @__PURE__ */ new Set(["name", "number", "bed", "multiplier"]);
  var COORDS_KEYS = /* @__PURE__ */ new Set(["x", "y"]);
  var isRecord2 = (value2) => typeof value2 === "object" && value2 !== null && !Array.isArray(value2);
  var known = (values, value2) => values.includes(value2);
  function parseBoardState(raw) {
    if (!isRecord2(raw)) return void 0;
    const anomalies = [];
    const flag = (field, value2) => {
      anomalies.push({ field, value: value2 });
    };
    for (const key of Object.keys(raw)) {
      if (!STATE_KEYS.has(key)) flag(key, raw[key]);
    }
    const boolAt = (key) => {
      const value2 = raw[key];
      if (typeof value2 === "boolean") return value2;
      flag(key, value2);
      return false;
    };
    const stringAt = (key, values) => {
      const value2 = raw[key];
      if (typeof value2 !== "string") {
        flag(key, value2);
        return "Offline";
      }
      if (!known(values, value2)) flag(key, value2);
      return value2;
    };
    const status = stringAt("status", KNOWN_BOARD_STATUSES);
    const event = stringAt("event", KNOWN_BOARD_EVENTS);
    const throws = parseThrows(raw["throws"], flag);
    const numThrows = raw["numThrows"];
    if (numThrows !== void 0 && numThrows !== throws.length) flag("numThrows", numThrows);
    return {
      state: {
        connected: boolAt("connected"),
        running: boolAt("running"),
        status,
        event,
        numThrows: throws.length,
        throws
      },
      anomalies
    };
  }
  function parseThrows(raw, flag) {
    if (raw === void 0) return [];
    if (!Array.isArray(raw)) {
      flag("throws", raw);
      return [];
    }
    const result = [];
    for (const [index, entry] of raw.entries()) {
      const at = `throws.${index}`;
      if (!isRecord2(entry)) {
        flag(at, entry);
        continue;
      }
      for (const key of Object.keys(entry)) {
        if (!THROW_KEYS.has(key)) flag(`${at}.${key}`, entry[key]);
      }
      const bouncer = entry["bouncer"];
      if (bouncer !== void 0 && typeof bouncer !== "boolean") flag(`${at}.bouncer`, bouncer);
      const coords = parseCoords(entry["coords"], `${at}.coords`, flag);
      result.push({
        segment: parseSegment(entry["segment"], `${at}.segment`, flag),
        bouncer: bouncer === true,
        ...coords === void 0 ? {} : { coords }
      });
    }
    return result;
  }
  function parseSegment(raw, at, flag) {
    if (!isRecord2(raw)) {
      flag(at, raw);
      return { name: "?", number: 0, bed: "Outside", multiplier: 0 };
    }
    for (const key of Object.keys(raw)) {
      if (!SEGMENT_KEYS.has(key)) flag(`${at}.${key}`, raw[key]);
    }
    const name = raw["name"];
    const number = raw["number"];
    const bed = raw["bed"];
    const multiplier = raw["multiplier"];
    if (typeof name !== "string") flag(`${at}.name`, name);
    if (typeof number !== "number" || !Number.isFinite(number)) flag(`${at}.number`, number);
    if (typeof multiplier !== "number" || !Number.isFinite(multiplier)) flag(`${at}.multiplier`, multiplier);
    if (typeof bed !== "string") flag(`${at}.bed`, bed);
    else if (!known(KNOWN_BEDS, bed)) flag(`${at}.bed`, bed);
    return {
      name: typeof name === "string" ? name : "?",
      number: typeof number === "number" && Number.isFinite(number) ? number : 0,
      bed: typeof bed === "string" ? bed : "Outside",
      multiplier: typeof multiplier === "number" && Number.isFinite(multiplier) ? multiplier : 0
    };
  }
  function parseCoords(raw, at, flag) {
    if (raw === void 0) return void 0;
    if (!isRecord2(raw)) {
      flag(at, raw);
      return void 0;
    }
    for (const key of Object.keys(raw)) {
      if (!COORDS_KEYS.has(key)) flag(`${at}.${key}`, raw[key]);
    }
    const x = raw["x"];
    const y = raw["y"];
    if (typeof x !== "number" || !Number.isFinite(x) || typeof y !== "number" || !Number.isFinite(y)) {
      flag(at, raw);
      return void 0;
    }
    return { x, y };
  }

  // src/turn.ts
  var EMPTY_STATE = {
    connected: false,
    running: false,
    status: "",
    event: "",
    numThrows: 0,
    throws: []
  };
  var IN_TAKEOUT = "Takeout in progress";
  var toDart2 = (entry, index) => ({
    index,
    segment: entry.segment,
    score: scoreOf(entry.segment),
    bouncer: entry.bouncer,
    ...entry.coords === void 0 ? {} : { coords: entry.coords }
  });
  var sameSegment2 = (a, b) => a.name === b.name && a.number === b.number && a.bed === b.bed && a.multiplier === b.multiplier;
  var TurnTracker = class {
    #previous;
    #committed = false;
    #corrections = [];
    /** Current board state as a client should see it on connect. */
    snapshot() {
      const state = this.#previous;
      if (state === void 0) {
        const offline = applyCorrections([], this.#corrections);
        return {
          status: "Offline",
          boardEvent: "Offline",
          connected: false,
          running: false,
          darts: offline.darts,
          detected: [],
          origins: offline.origins,
          corrections: [...this.#corrections]
        };
      }
      const applied = applyCorrections(state.throws, this.#corrections);
      return {
        status: state.status,
        boardEvent: state.event,
        connected: state.connected,
        running: state.running,
        darts: applied.darts,
        detected: state.throws.map(toDart2),
        origins: applied.origins,
        corrections: [...this.#corrections]
      };
    }
    /**
     * Records a correction against the turn currently on the board. Refused once the turn is committed:
     * by then the score has already gone out, and a late edit would silently disagree with it.
     */
    correct(correction) {
      if (this.#committed) {
        return { ok: false, detail: "this turn is already committed - fix it in the scorer instead" };
      }
      const adds = this.#corrections.filter((existing) => existing.kind === "add");
      try {
        validateCorrection(correction, this.#previous?.throws.length ?? 0, adds.length);
      } catch (error) {
        return { ok: false, detail: error instanceof Error ? error.message : String(error) };
      }
      if (correction.kind === "remove-added" || correction.kind === "replace-added") {
        const target = adds[correction.at];
        const position2 = this.#corrections.indexOf(target);
        if (correction.kind === "remove-added") this.#corrections.splice(position2, 1);
        else this.#corrections[position2] = { kind: "add", segment: correction.segment };
        return { ok: true };
      }
      this.#corrections.push(correction);
      return { ok: true };
    }
    /** Drops every standing correction - used when a mistake in the corrections themselves needs undoing. */
    clearCorrections() {
      this.#corrections = [];
    }
    apply(raw) {
      const parsed = parseBoardState(raw);
      if (parsed === void 0) {
        return [{ type: "board-unknown", field: "$", value: raw, raw }];
      }
      const next = parsed.state;
      const previous = this.#previous ?? EMPTY_STATE;
      const unknown = parsed.anomalies.map((anomaly) => ({
        type: "board-unknown",
        field: anomaly.field,
        value: anomaly.value,
        raw
      }));
      const flag = (field, value2) => {
        unknown.push({ type: "board-unknown", field, value: value2, raw });
      };
      const status = [];
      const corrected = [];
      const thrown = [];
      const committed = [];
      const cleared = [];
      if (previous.status !== next.status || previous.event !== next.event || previous.connected !== next.connected || previous.running !== next.running) {
        status.push({
          type: "board-status",
          status: next.status,
          boardEvent: next.event,
          connected: next.connected,
          running: next.running
        });
      }
      const slots = Math.max(previous.throws.length, next.throws.length);
      for (let index = 0; index < slots; index++) {
        const before = previous.throws[index];
        const after = next.throws[index];
        if (after === void 0) {
          if (next.throws.length > 0) flag(`throws.${index}-vanished`, before);
          continue;
        }
        if (before === void 0) {
          if (index >= 3) flag(`throws.${index}`, after);
          if (this.#committed) flag("throws-after-commit", after);
          thrown.push({ type: "dart-thrown", ...toDart2(after, index) });
          continue;
        }
        if (!sameSegment2(before.segment, after.segment)) {
          corrected.push({
            type: "dart-corrected",
            index,
            from: { segment: before.segment, score: scoreOf(before.segment) },
            to: { segment: after.segment, score: scoreOf(after.segment) }
          });
        }
      }
      if (next.event === "Takeout started" && !this.#committed && next.throws.length > 0) {
        const applied = applyCorrections(next.throws, this.#corrections);
        const darts = applied.darts;
        for (const replacement of finalReplacements(applied.replacements)) {
          corrected.push({
            type: "dart-corrected",
            index: replacement.index,
            from: { segment: replacement.from, score: scoreOf(replacement.from) },
            to: { segment: replacement.to, score: scoreOf(replacement.to) }
          });
        }
        committed.push({
          type: "turn-committed",
          darts,
          total: darts.reduce((sum, dart) => sum + dart.score, 0),
          dartCount: darts.length
        });
        this.#committed = true;
      }
      if (previous.status === IN_TAKEOUT && next.status !== IN_TAKEOUT && next.throws.length > 0) {
        flag("takeout-abandoned", next.status);
      }
      if (previous.throws.length > 0 && next.throws.length === 0) {
        if (!this.#committed) flag("cleared-without-takeout", previous.throws.length);
        cleared.push({ type: "turn-cleared" });
        this.#committed = false;
        this.#corrections = [];
      }
      this.#previous = next;
      return [...unknown, ...status, ...corrected, ...thrown, ...committed, ...cleared];
    }
    /** The bridge lost the board. Reported once, not on every failed liveness check. */
    markDisconnected() {
      const previous = this.#previous;
      if (previous === void 0 || !previous.connected) return [];
      this.#previous = { ...previous, connected: false };
      return [
        {
          type: "board-status",
          status: previous.status,
          boardEvent: previous.event,
          connected: false,
          running: previous.running
        }
      ];
    }
  };

  // sink/core/board.ts
  var toDart3 = (entry, index) => ({
    index,
    segment: entry.segment,
    score: scoreOf(entry.segment),
    bouncer: entry.bouncer,
    ...entry.coords === void 0 ? {} : { coords: entry.coords }
  });
  var sameSegment3 = (a, b) => a.name === b.name && a.number === b.number && a.bed === b.bed && a.multiplier === b.multiplier;
  var asCleared = (state) => ({
    connected: state.connected,
    running: state.running,
    status: state.status,
    event: state.event,
    numThrows: 0
  });
  var BoardEvents = class {
    #tracker = new TurnTracker();
    #seq = 0;
    #greeted = false;
    /** This turn's score has gone out. Follows the tracker's own arming, which is not readable from it. */
    #committed = false;
    /** The last reading that had darts in it - what a missed takeout has to be committed from. */
    #inBoard = [];
    /** One reading in, the events it produced out, stamped and ready for the sink. */
    read(raw) {
      const state = parseBoardState(raw)?.state;
      const drafts = [];
      if (state !== void 0 && this.#committed && this.#startsNewTurn(state.throws)) {
        drafts.push(...this.#tracker.apply(asCleared(state)));
      }
      drafts.push(...this.#tracker.apply(raw));
      if (state !== void 0) this.#closeMissedTakeout(drafts, state);
      for (const draft of drafts) {
        if (draft.type === "turn-committed") this.#committed = true;
        else if (draft.type === "turn-cleared") this.#committed = false;
      }
      if (state !== void 0 && state.throws.length > 0) this.#inBoard = state.throws;
      if (!this.#greeted) {
        this.#greeted = true;
        const kept = drafts.filter((draft) => draft.type === "board-unknown");
        return [...kept, this.#hello()].map((draft) => this.#stamp(draft));
      }
      return drafts.map((draft) => this.#stamp(draft));
    }
    /**
     * A takeout that fell between two samples: the board cleared, and the `Takeout started` that would
     * have committed the turn was never sampled. The darts from the last reading are what it was.
     *
     * `event` says what cleared the board, so this stays out of the one case where a clear means the turn
     * is to be forgotten: `Manual reset`, which is somebody pressing reset in the Board Manager.
     */
    #closeMissedTakeout(drafts, state) {
      const at = drafts.findIndex((draft) => draft.type === "turn-cleared");
      if (at < 0 || this.#committed || this.#inBoard.length === 0) return;
      if (state.event !== "Takeout finished") return;
      const darts = this.#inBoard.map(toDart3);
      drafts.splice(at, 0, {
        type: "turn-committed",
        darts,
        total: darts.reduce((sum, dart) => sum + dart.score, 0),
        dartCount: darts.length
      });
    }
    /** Darts in a board that should be empty, and a different first dart: this is the next turn. */
    #startsNewTurn(throws) {
      const before = this.#inBoard[0]?.segment;
      const now = throws[0]?.segment;
      if (before === void 0 || now === void 0) return false;
      return !sameSegment3(before, now);
    }
    /** Built from the tracker, so it says the same as `GET /turn` on the app: what is in the board now. */
    #hello() {
      const snapshot = this.#tracker.snapshot();
      return {
        type: "hello",
        status: snapshot.status,
        boardEvent: snapshot.boardEvent,
        connected: snapshot.connected,
        running: snapshot.running,
        transport: "http",
        darts: snapshot.darts
      };
    }
    /** The app stamps these on publication; with no app, the page mints them. */
    #stamp(draft) {
      this.#seq += 1;
      return { ...draft, ts: (/* @__PURE__ */ new Date()).toISOString(), seq: this.#seq };
    }
  };

  // sink/runtime/gm.ts
  // Replaced TamperMonkey GM_* storage with localStorage-based synchronous shim
  // and GM_xmlhttpRequest with a message to the extension service worker.
  var gmStorage = {
    read: (key) => {
      try {
        const raw = localStorage.getItem(key);
        return raw === null ? void 0 : raw;
      } catch (e) {
        return void 0;
      }
    },
    write: (key, value2) => {
      try {
        // Preserve original behaviour where values are strings
        localStorage.setItem(key, value2);
      } catch (e) {
      }
    }
  };
  function gmFetch(call) {
    return new Promise((resolve) => {
      try {
        chrome.runtime.sendMessage({ type: "gmFetch", call }, (response) => {
          // response should mimic GM_xmlhttpRequest's response object or be undefined on error
          resolve(response);
        });
      } catch (e) {
        resolve(void 0);
      }
    });
  };

        ...call,
        onload: (response) => finish(response),
        onerror: () => finish(void 0),
        ontimeout: () => finish(void 0)
      });
    });
  }

  // sink/runtime/board.ts
  var POLL_MS = 300;
  var TIMEOUT_MS = 2500;
  var MIN_BACKOFF_MS = 1e3;
  var MAX_BACKOFF_MS = 15e3;
  var viaGm = (url, timeout) => gmFetch({ method: "GET", url, timeout, headers: { accept: "application/json" } });
  var BoardPoll = class {
    #base;
    #handlers;
    #log;
    #fetch;
    #pollMs;
    #minBackoffMs;
    #events = new BoardEvents();
    #running = false;
    /** `undefined` until the first answer either way, so the first failure is reported like any other. */
    #up;
    #backoffMs;
    constructor(boardUrl, handlers, log2, options = {}) {
      this.#base = boardUrl.replace(/\/+$/, "");
      this.#handlers = handlers;
      this.#log = log2;
      this.#fetch = options.fetch ?? viaGm;
      this.#pollMs = options.pollMs ?? POLL_MS;
      this.#minBackoffMs = options.minBackoffMs ?? MIN_BACKOFF_MS;
      this.#backoffMs = this.#minBackoffMs;
    }
    start() {
      if (this.#running) return;
      this.#running = true;
      void this.#loop();
    }
    stop() {
      this.#running = false;
    }
    async #loop() {
      while (this.#running) {
        const reading = await this.#read();
        if (!reading.ok) {
          if (this.#up !== false) {
            this.#up = false;
            this.#handlers.onDown(reading.reason);
          }
          await sleep(this.#backoffMs);
          this.#backoffMs = Math.min(this.#backoffMs * 2, MAX_BACKOFF_MS);
          continue;
        }
        this.#backoffMs = this.#minBackoffMs;
        if (this.#up !== true) {
          this.#up = true;
          this.#handlers.onUp();
        }
        for (const event of this.#events.read(reading.raw)) await this.#handlers.onEvent(event);
        await sleep(this.#pollMs);
      }
    }
    async #read() {
      const response = await this.#fetch(`${this.#base}/api/state`, TIMEOUT_MS);
      if (response === void 0) return { ok: false, reason: "board unreachable" };
      if (response.status !== 200) return { ok: false, reason: `HTTP ${response.status}` };
      const body = response.responseText.trim();
      if (!body.startsWith("{")) {
        this.#log("that address answers, but not with board state - check the port (3180)");
        return { ok: false, reason: "not the board API" };
      }
      try {
        return { ok: true, raw: JSON.parse(body) };
      } catch {
        return { ok: false, reason: "the board sent something that is not JSON" };
      }
    }
  };
  var sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // src/discover.ts
  var CANDIDATES = ["http://127.0.0.1:3180", "http://opendartboard.local:3180"];
  var isRecord3 = (value2) => typeof value2 === "object" && value2 !== null;
  var text = (value2, fallback) => typeof value2 === "string" && value2.trim() !== "" ? value2.trim() : fallback;
  var probeBoard = async (url, timeoutMs) => {
    try {
      const response = await fetch(`${url}/api/host`, {
        signal: AbortSignal.timeout(timeoutMs),
        headers: { accept: "application/json" }
      });
      if (!response.ok) return void 0;
      if (!(response.headers.get("content-type") ?? "").includes("application/json")) return void 0;
      const parsed = JSON.parse(await response.text());
      if (!isRecord3(parsed)) return void 0;
      if (parsed["clientVersion"] === void 0 && parsed["hostname"] === void 0) return void 0;
      return {
        url,
        hostname: text(parsed["hostname"], "unknown"),
        version: text(parsed["clientVersion"], "unknown")
      };
    } catch {
      return void 0;
    }
  };
  async function discoverBoards(options = {}) {
    const candidates = options.candidates ?? CANDIDATES;
    const probe2 = options.probe ?? probeBoard;
    const timeoutMs = options.timeoutMs ?? 2e3;
    const results = await Promise.all(candidates.map((url) => probe2(url, timeoutMs)));
    const seen = /* @__PURE__ */ new Set();
    return results.filter((found) => {
      if (found === void 0) return false;
      const key = `${found.hostname}/${found.version}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  // sink/runtime/discover.ts
  var isRecord4 = (value2) => typeof value2 === "object" && value2 !== null;
  var text2 = (value2, fallback) => typeof value2 === "string" && value2.trim() !== "" ? value2.trim() : fallback;
  var probe = async (url, timeoutMs) => {
    const response = await gmFetch({
      method: "GET",
      url: `${url}/api/host`,
      timeout: timeoutMs,
      headers: { accept: "application/json" }
    });
    if (response === void 0 || response.status !== 200) return void 0;
    let parsed;
    try {
      parsed = JSON.parse(response.responseText);
    } catch {
      return void 0;
    }
    if (!isRecord4(parsed)) return void 0;
    if (parsed["clientVersion"] === void 0 && parsed["hostname"] === void 0) return void 0;
    return { url, hostname: text2(parsed["hostname"], "unknown"), version: text2(parsed["clientVersion"], "unknown") };
  };
  async function findBoard(timeoutMs = 2500) {
    const found = await discoverBoards({ probe, timeoutMs });
    return found[0];
  }

  // sink/runtime/settings.ts
  function sharedSettings(gm, local) {
    if (local === void 0) return gm;
    return {
      read: (key) => {
        const here = local.getItem(key);
        if (here !== null) return here;
        const before = gm.read(key);
        if (before !== void 0) local.setItem(key, before);
        return before;
      },
      write: (key, value2) => local.setItem(key, value2)
    };
  }
  function pageStorage() {
    try {
      const probe2 = "__n01-sink-probe";
      localStorage.setItem(probe2, "1");
      localStorage.removeItem(probe2);
      return localStorage;
    } catch {
      return void 0;
    }
  }

  // sink/ui/keys.ts
  var KEY_ACTIONS = ["confirm", "dart1", "dart2", "dart3"];
  var DEFAULT_KEYS = {
    confirm: "Enter",
    dart1: "F1",
    dart2: "F2",
    dart3: "F3"
  };
  var RESERVED = /* @__PURE__ */ new Set(["F5", "F11", "F12", "Tab", "Escape", "Meta", "Control", "Alt", "Shift", "Dead"]);
  var isBindable = (key) => key !== "" && !RESERVED.has(key);
  var keyLabel = (key) => key === " " ? "Space" : key.length === 1 ? key.toUpperCase() : key;
  function parseKeys(stored2) {
    if (stored2 === void 0 || stored2 === "") return { ...DEFAULT_KEYS };
    try {
      const parsed = JSON.parse(stored2);
      if (typeof parsed !== "object" || parsed === null) return { ...DEFAULT_KEYS };
      const record = parsed;
      const keys2 = { ...DEFAULT_KEYS };
      for (const action of KEY_ACTIONS) {
        const key = record[action];
        if (typeof key === "string" && isBindable(key)) keys2[action] = key;
      }
      return keys2;
    } catch {
      return { ...DEFAULT_KEYS };
    }
  }
  var serializeKeys = (keys2) => JSON.stringify(keys2);
  function actionFor(keys2, key) {
    return KEY_ACTIONS.find((action) => keys2[action] === key);
  }
  function isTyping(target) {
    if (typeof target !== "object" || target === null) return false;
    const node = target;
    if (node.isContentEditable === true) return true;
    const tag = typeof node.tagName === "string" ? node.tagName.toUpperCase() : "";
    if (tag === "TEXTAREA" || tag === "SELECT") return true;
    if (tag !== "INPUT") return false;
    return typeof node.value === "string" && node.value !== "";
  }

  // sink/ui/strings.ts
  var en = {
    rowBridge: "bridge",
    /** The same row in the build that reads the board itself, with no app to name. */
    rowBoard: "board",
    rowEvents: "events",
    rowMode: "mode",
    rowLast: "last",
    rowLeft: "left",
    /** Points in the board right now, under the boxes that say which darts made them. */
    rowThrown: "in board",
    /** Under that number: how many darts made it. `{0}` darts, including none. */
    ofDarts: "from {0}",
    /** Shown beside the remaining score when no finish is on from it. */
    noCheckout: "-",
    connected: "connected",
    offline: "offline",
    /**
     * The board answers, but says it has lost its own cameras or engine. Two different failures - the script
     * not reaching the board, and the board not working - and the row has to be able to say which.
     */
    boardOffline: "board offline",
    /** `running: false`: the board reports state normally and will never register a dart. */
    notRunning: "not running",
    at: "at {0}",
    seenTurns: "{0} seen \xB7 {1} turns",
    doneTo: "done to {0}",
    paused: "PAUSED",
    live: "LIVE",
    /**
     * "dry-run" is jargon that says nothing to a player. Not "offline" either: the panel reports the
     * bridge connection as offline two lines below, and one word cannot mean both.
     */
    preview: "PREVIEW",
    nothingYet: "nothing yet",
    entered: "entered {0} \u2192 {1} left",
    wouldEnter: "would enter {0}",
    sent: "sent {0}",
    failed: "failed: {0}",
    skipped: "skipped: {0}",
    into: "into {0}",
    outIn: "{0} out in {1}",
    /** The one step nobody can automate: n01 asks a person how many darts the finish took. */
    confirmCheckout: "confirm the checkout in n01 (darts: {0})",
    /** Why a turn scored nothing. "0 (bust)" alone reads like the board misread the darts. */
    bustOver: "0 (bust: over {0})",
    bustNotDouble: "0 (bust: {0} is not a double)",
    bustLeavesOne: "0 (bust: would leave 1)",
    // One box per dart, and what a box can say about the dart in it.
    slotCorrectHint: "Correct this dart",
    slotAddHint: "Add a dart the board missed",
    /** The reading a person overruled. Short: this sits inside a box a third of the panel wide. */
    slotBoardSaid: "board: {0}",
    slotAdded: "added",
    slotBounced: "bounced",
    // The keypad, which takes over the panel while it is open.
    padCorrect: "Dart {0}",
    padAdd: "Add a dart",
    padMiss: "MISS",
    ringSingle: "Single",
    ringDouble: "Double",
    ringTriple: "Triple",
    btnStart: "START",
    btnStop: "STOP",
    btnCopy: "copy",
    btnCopyHint: "Copy the log and the build details, to paste into a message",
    btnBack: "back",
    btnRemove: "remove",
    btnRemoveHint: "There was no dart here",
    btnUndo: "undo all",
    btnUndoHint: "Drop every correction on this turn",
    correctionRefused: "not corrected: {0}",
    /**
     * The only refusal a player can meet, and now a local one: the score went to n01 the moment the darts
     * came out, so there is nothing here left to change.
     */
    correctTooLate: "too late - the score is in n01. Fix it there",
    // Settings: everything set once and then left alone.
    settings: "Settings",
    commitLabel: "entering a turn",
    commitAuto: "on takeout",
    commitConfirm: "when you say",
    commitAutoNote: "The turn goes in as soon as you reach for the darts.",
    commitConfirmNote: "Nothing goes in until you press {0}. The darts can stay in the board.",
    size: "size",
    /** Named for what the slider *raises*: at 100% the scoreboard is solid, at 30% you read through it. */
    opacity: "opacity",
    /** On the mode bar, which is what the scoreboard is dragged by. */
    dragHint: "Drag to move the darts and the score anywhere on screen",
    keyConfirm: "enter the turn",
    /** `{0}` is 1, 2 or 3 - which box the key opens. */
    keyDart: "dart {0}",
    pressAKey: "press a key",
    keysHint: "Press a key to change it. Keys are ignored while you are typing a score into n01.",
    /** Beside the boxes, while a finished turn waits for a person. `{0}` points, `{1}` the key to press. */
    confirmWaiting: "{0} ready - press {1}",
    /** The same thing in the status block, where the last decision is reported. */
    waitingConfirm: "waiting for you to confirm {0} ({1} darts)",
    nothingToEnter: "nothing in the board to enter",
    copied: "copied",
    copyFailed: "blocked",
    addressHint: "Address of the app, if it runs on another machine. Enter to save",
    addressHintBoard: "Address of the board, if it is not on this machine. Enter to save",
    collapse: "Shrink to a badge",
    expand: "Open the panel",
    /** The button shows the code of the language it switches *to*; the sentence is its tooltip. */
    langCode: "PL",
    langSwitch: "Switch to Polish",
    /** Shown on the collapsed badge when no darts are in the board. */
    noScore: "-"
  };
  var pl = {
    rowBridge: "bridge",
    rowBoard: "tarcza",
    rowEvents: "eventy",
    rowMode: "tryb",
    rowLast: "ostatnio",
    rowLeft: "zosta\u0142o",
    rowThrown: "w tarczy",
    ofDarts: "z {0}",
    noCheckout: "-",
    connected: "po\u0142\u0105czony",
    offline: "offline",
    boardOffline: "tarcza offline",
    notRunning: "zatrzymana",
    at: "na {0}",
    seenTurns: "{0} widzianych \xB7 {1} tur",
    doneTo: "zrobione do {0}",
    paused: "PAUZA",
    live: "NA \u017BYWO",
    preview: "PODGL\u0104D",
    nothingYet: "jeszcze nic",
    entered: "wpisano {0} \u2192 zosta\u0142o {1}",
    wouldEnter: "wpisa\u0142bym {0}",
    sent: "wys\u0142ano {0}",
    failed: "b\u0142\u0105d: {0}",
    skipped: "pomini\u0119te: {0}",
    into: "do {0}",
    outIn: "{0} zamkni\u0119te na {1}",
    confirmCheckout: "potwierd\u017A wyj\u015Bcie w n01 (lotki: {0})",
    bustOver: "0 (bust: ponad {0})",
    bustNotDouble: "0 (bust: {0} to nie double)",
    bustLeavesOne: "0 (bust: zosta\u0142aby 1)",
    slotCorrectHint: "Popraw t\u0119 lotk\u0119",
    slotAddHint: "Dodaj lotk\u0119, kt\xF3rej tarcza nie zobaczy\u0142a",
    slotBoardSaid: "tarcza: {0}",
    slotAdded: "dodana",
    slotBounced: "odbita",
    padCorrect: "Lotka {0}",
    padAdd: "Dodaj lotk\u0119",
    padMiss: "MISS",
    ringSingle: "Pojedyncze",
    ringDouble: "Podw\xF3jne",
    ringTriple: "Potr\xF3jne",
    btnStart: "START",
    btnStop: "STOP",
    btnCopy: "kopiuj",
    btnCopyHint: "Skopiuj log i dane builda, do wklejenia w wiadomo\u015Bci",
    btnBack: "wr\xF3\u0107",
    btnRemove: "usu\u0144",
    btnRemoveHint: "Nie by\u0142o tu lotki",
    btnUndo: "cofnij",
    btnUndoHint: "Cofnij wszystkie poprawki w tej turze",
    correctionRefused: "nie poprawiono: {0}",
    correctTooLate: "za p\xF3\u017Ano - wynik jest ju\u017C w n01. Popraw go tam",
    settings: "Ustawienia",
    commitLabel: "wpisywanie tury",
    commitAuto: "przy wyci\u0105ganiu",
    commitConfirm: "na Tw\xF3j znak",
    commitAutoNote: "Tura leci do n01, gdy tylko si\u0119gniesz po lotki.",
    commitConfirmNote: "Nic nie leci do n01, dop\xF3ki nie naci\u015Bniesz {0}. Lotki mog\u0105 zosta\u0107 w tarczy.",
    size: "rozmiar",
    opacity: "widoczno\u015B\u0107",
    dragHint: "Przeci\u0105gnij, \u017Ceby przenie\u015B\u0107 lotki i wynik w dowolne miejsce ekranu",
    keyConfirm: "wpisz tur\u0119",
    keyDart: "lotka {0}",
    pressAKey: "naci\u015Bnij klawisz",
    keysHint: "Naci\u015Bnij klawisz, \u017Ceby go zmieni\u0107. Gdy wpisujesz wynik w n01, skr\xF3ty nie dzia\u0142aj\u0105.",
    confirmWaiting: "{0} gotowe - naci\u015Bnij {1}",
    waitingConfirm: "czekam na Twoje potwierdzenie {0} ({1} lotki)",
    nothingToEnter: "w tarczy nie ma czego wpisa\u0107",
    copied: "skopiowane",
    copyFailed: "zablokowane",
    addressHint: "Adres aplikacji, je\u015Bli dzia\u0142a na innej maszynie. Enter zapisuje",
    addressHintBoard: "Adres tarczy, je\u015Bli nie jest na tej maszynie. Enter zapisuje",
    collapse: "Zwi\u0144 do znaczka",
    expand: "Otw\xF3rz panel",
    langCode: "EN",
    langSwitch: "Switch to English",
    noScore: "-"
  };
  var PANEL_STRINGS = { en, pl };
  function panelLang(language) {
    return language !== void 0 && language.toLowerCase().startsWith("pl") ? "pl" : "en";
  }
  function panelText(lang2, key, ...args) {
    let text3 = PANEL_STRINGS[lang2][key];
    args.forEach((value2, index) => {
      text3 = text3.replace(`{${index}}`, String(value2));
    });
    return text3;
  }

  // sink/ui/widget.ts
  var KILL_COMBO = "Ctrl+Shift+X";
  var MIN_SCALE = 0.8;
  var MAX_SCALE = 3;
  var MIN_OPACITY = 0.3;
  var MAX_OPACITY = 1;
  var clamp = (value2, low, high, fallback) => Number.isFinite(value2) ? Math.min(high, Math.max(low, value2)) : fallback;
  var clampScale = (scale2) => clamp(scale2, MIN_SCALE, MAX_SCALE, 1);
  var clampOpacity = (opacity2) => clamp(opacity2, MIN_OPACITY, MAX_OPACITY, 1);
  var LOG_LINES_SHOWN = 80;
  var STYLE = [
    "position:fixed",
    "right:10px",
    "bottom:10px",
    "z-index:2147483647",
    "width:300px",
    "padding:9px 10px",
    "background:rgba(17,17,17,0.95)",
    "color:#eee",
    "font:11px/1.45 ui-monospace,SFMono-Regular,Menlo,monospace",
    "border:1px solid #444",
    "border-radius:6px"
  ].join(";");
  var MODE_BOX = "margin:0 0 6px;padding:6px 8px;border-radius:5px;text-align:center;font-size:15px;font-weight:bold;letter-spacing:.06em;cursor:move;touch-action:none;user-select:none";
  var PRIMARY = "flex:1;padding:9px 2px;font:inherit;font-size:13px;font-weight:bold;letter-spacing:.06em;cursor:pointer;border-radius:5px";
  var SMALL = "padding:9px 8px;font:inherit;cursor:pointer;border:1px solid #555;background:#222;color:#eee;border-radius:5px";
  var PILL = [
    "position:fixed",
    "right:10px",
    "bottom:10px",
    "z-index:2147483647",
    "display:none",
    "align-items:center",
    "gap:7px",
    "padding:6px 11px 6px 9px",
    "background:rgba(17,17,17,0.95)",
    "color:#eee",
    "font:13px/1 ui-monospace,SFMono-Regular,Menlo,monospace",
    "font-weight:bold",
    "border:1px solid #444",
    "border-radius:999px",
    "cursor:pointer"
  ].join(";");
  var SCOREBOARD = [
    "position:fixed",
    "z-index:2147483647",
    "width:300px",
    "padding:8px 9px 9px",
    "background:rgba(17,17,17,0.95)",
    "color:#eee",
    "font:11px/1.45 ui-monospace,SFMono-Regular,Menlo,monospace",
    "border:1px solid #444",
    "border-radius:6px"
  ].join(";");
  var DEFAULT_POSITION = { x: 16, y: 16 };
  var EDGE = 60;
  var MODE_COLOURS = {
    live: ["#14361f", "#2f7a49", "#b8f5b8"],
    dry: ["#26292f", "#454a55", "#dcdfe4"],
    paused: ["#3a1f1f", "#8a2a2a", "#ffb3b3"]
  };
  var SLOT_ROW = "display:flex;gap:5px;margin:7px 0 4px";
  var SLOT = [
    "position:relative",
    "flex:1 1 0",
    "min-width:0",
    "padding:5px 2px 4px",
    "border-radius:5px",
    "text-align:center",
    "background:#1b1b1b",
    "cursor:pointer",
    "user-select:none"
  ].join(";");
  var EDITED = "#f0c04a";
  var SLOT_NAME = "font-size:19px;font-weight:bold;line-height:1.15;overflow:hidden;text-overflow:ellipsis";
  var SLOT_META = "font-size:9px;color:#8a8a8a;line-height:1.3;overflow:hidden;text-overflow:ellipsis;white-space:nowrap";
  var SLOT_KILL = "position:absolute;top:0;right:3px;font-size:12px;line-height:1.2;color:#8a8a8a";
  var PAD_KEY = "padding:8px 0;font:inherit;font-size:12px;font-weight:bold;cursor:pointer;border:1px solid #555;background:#222;color:#eee;border-radius:4px";
  var PAD_NUMS = "display:grid;grid-template-columns:repeat(5,1fr);gap:4px";
  var PAD = [
    "position:fixed",
    "left:50%",
    "top:50%",
    "z-index:2147483647",
    "display:none",
    "width:300px",
    "padding:8px 9px 9px",
    "background:rgba(17,17,17,0.98)",
    "color:#eee",
    "font:11px/1.45 ui-monospace,SFMono-Regular,Menlo,monospace",
    "border:1px solid #666",
    "border-radius:6px",
    "box-shadow:0 8px 30px rgba(0,0,0,0.55)"
  ].join(";");
  var PAD_HEIGHT = 360;
  var RING_ROW = "display:flex;gap:4px;margin:6px 0";
  var STAT_ROW = "display:flex;gap:5px;margin-bottom:5px";
  var STAT = [
    "flex:1 1 0",
    "min-width:0",
    "padding:4px 6px 5px",
    "border:1px solid #444",
    "border-radius:5px",
    "background:#1b1b1b",
    "text-align:center"
  ].join(";");
  var STAT_LABEL = "font-size:9px;letter-spacing:.06em;text-transform:uppercase;color:#9aa0a8";
  var STAT_VALUE = "font-size:21px;font-weight:bold;line-height:1.1";
  var SETTING_ROW = "display:flex;align-items:center;gap:6px;margin-top:4px";
  var RINGS2 = ["S", "D", "T"];
  var Widget = class {
    #panel;
    #scoreboard;
    #pill;
    #pillDot;
    #pillScore;
    #pillLeft;
    #pillOut;
    #title;
    #shrink;
    #mode;
    #slotRow;
    #statRow;
    #thrownLabel;
    #thrownValue;
    #thrownNote;
    #leftLabel;
    #leftValue;
    #leftOut;
    #noticeLine;
    #body;
    #logBox;
    #primary;
    #copy;
    #langButton;
    #address;
    #controls;
    #pad;
    #padTitle;
    #padRings = [];
    #padBull;
    #padMiss;
    #padRemove;
    #padUndo;
    #padBack;
    #settings;
    #settingsButton;
    #settingsTitle;
    #settingsBack;
    #commitButton;
    #commitLabel;
    #commitNote;
    #sizeSlider;
    #sizeName;
    #sizeLabel;
    #opacitySlider;
    #opacityName;
    #opacityLabel;
    #keyRows = [];
    #keysHint;
    #actions;
    #lang = "en";
    #view;
    /** Which box the keypad is aiming at, or `undefined` while it is closed. */
    #padAt;
    #ring = "S";
    #settingsOpen = false;
    /** Which shortcut is waiting for a key to be pressed at it. */
    #binding;
    /** Where the scoreboard actually ended up, which is the stored position clamped to the screen. */
    #placed = DEFAULT_POSITION;
    #dragging = false;
    constructor(document2, actions) {
      this.#actions = actions;
      const root = document2.createElement("div");
      root.style.cssText = STYLE;
      this.#panel = root;
      const header = document2.createElement("div");
      header.style.cssText = "display:flex;align-items:center;gap:6px";
      this.#title = document2.createElement("div");
      this.#title.style.cssText = "flex:1;font-weight:bold;color:#9aa0a8;overflow:hidden;text-overflow:ellipsis";
      this.#shrink = document2.createElement("button");
      this.#shrink.textContent = "\u2013";
      this.#shrink.style.cssText = "width:20px;height:20px;padding:0;font:inherit;line-height:1;cursor:pointer;border:1px solid #555;background:#222;color:#eee;border-radius:4px";
      this.#shrink.onclick = () => actions.setCollapsed(true);
      header.append(this.#title, this.#shrink);
      this.#mode = document2.createElement("div");
      this.#mode.style.cssText = MODE_BOX;
      this.#slotRow = document2.createElement("div");
      this.#slotRow.style.cssText = SLOT_ROW;
      this.#statRow = document2.createElement("div");
      this.#statRow.style.cssText = STAT_ROW;
      const stat = () => {
        const box = document2.createElement("div");
        box.style.cssText = STAT;
        const label = document2.createElement("div");
        label.style.cssText = STAT_LABEL;
        const value2 = document2.createElement("div");
        value2.style.cssText = STAT_VALUE;
        const note = document2.createElement("div");
        note.style.cssText = SLOT_META;
        box.append(label, value2, note);
        return { box, label, value: value2, note };
      };
      const thrown = stat();
      const left = stat();
      this.#thrownLabel = thrown.label;
      this.#thrownValue = thrown.value;
      this.#thrownNote = thrown.note;
      this.#leftLabel = left.label;
      this.#leftValue = left.value;
      this.#leftOut = left.note;
      this.#statRow.append(thrown.box, left.box);
      this.#noticeLine = document2.createElement("div");
      this.#noticeLine.style.cssText = `display:none;margin:0 0 4px;color:${EDITED}`;
      this.#body = document2.createElement("div");
      this.#body.style.cssText = "white-space:pre-wrap";
      const row = document2.createElement("div");
      row.style.cssText = "display:flex;gap:5px;margin-top:7px";
      this.#primary = document2.createElement("button");
      this.#primary.style.cssText = PRIMARY;
      this.#primary.onclick = () => {
        if (this.#view !== void 0 && !this.#view.dryRun && !this.#view.paused) actions.stop();
        else actions.start();
      };
      this.#copy = document2.createElement("button");
      this.#copy.style.cssText = SMALL;
      this.#copy.onclick = () => void this.#copyLog(document2);
      this.#langButton = document2.createElement("button");
      this.#langButton.style.cssText = SMALL;
      this.#langButton.onclick = () => actions.setLang(this.#lang === "pl" ? "en" : "pl");
      this.#settingsButton = document2.createElement("button");
      this.#settingsButton.style.cssText = SMALL;
      this.#settingsButton.textContent = "\u2699";
      this.#settingsButton.onclick = () => {
        this.#settingsOpen = !this.#settingsOpen;
        this.#binding = void 0;
        this.#padAt = void 0;
        this.#redraw();
      };
      row.append(this.#primary, this.#copy, this.#langButton, this.#settingsButton);
      this.#address = document2.createElement("input");
      this.#address.placeholder = "http://127.0.0.1:9210";
      this.#address.style.cssText = "width:100%;box-sizing:border-box;margin-top:5px;padding:5px 6px;font:inherit;border:1px solid #555;background:#111;color:#eee;border-radius:4px";
      this.#address.onkeydown = (event) => {
        if (event.key === "Enter") actions.setBridgeUrl(this.#address.value);
      };
      this.#logBox = document2.createElement("div");
      this.#logBox.style.cssText = "margin-top:7px;padding-top:6px;border-top:1px solid #333;white-space:pre-wrap;color:#8a8a8a;max-height:104px;overflow-y:auto;overscroll-behavior:contain";
      this.#controls = document2.createElement("div");
      this.#controls.append(this.#body, row, this.#address, this.#logBox);
      this.#pad = document2.createElement("div");
      this.#pad.style.cssText = PAD;
      const padHeader = document2.createElement("div");
      padHeader.style.cssText = "display:flex;align-items:center;gap:6px;margin-top:6px";
      this.#padTitle = document2.createElement("div");
      this.#padTitle.style.cssText = "flex:1;font-weight:bold";
      this.#padBack = document2.createElement("button");
      this.#padBack.style.cssText = SMALL;
      this.#padBack.onclick = () => this.#closePad();
      padHeader.append(this.#padTitle, this.#padBack);
      const ringRow = document2.createElement("div");
      ringRow.style.cssText = RING_ROW;
      for (const ring of RINGS2) {
        const button = document2.createElement("button");
        button.style.cssText = `${PAD_KEY};flex:1`;
        button.textContent = ring;
        button.onclick = () => {
          this.#ring = ring;
          this.#redraw();
        };
        this.#padRings.push(button);
        ringRow.append(button);
      }
      const nums = document2.createElement("div");
      nums.style.cssText = PAD_NUMS;
      const key = (label, resolve) => {
        const button = document2.createElement("button");
        button.style.cssText = PAD_KEY;
        button.textContent = label;
        button.onclick = () => this.#send(resolve());
        nums.append(button);
        return button;
      };
      for (let number = 1; number <= 20; number++) {
        const value2 = number;
        key(String(value2), () => ({ number: value2, ring: this.#ring }));
      }
      this.#padBull = key("25", () => ({ number: 25, ring: this.#ring === "D" ? "D" : "S" }));
      const padFooter = document2.createElement("div");
      padFooter.style.cssText = "display:flex;gap:4px;margin-top:5px";
      this.#padRemove = document2.createElement("button");
      this.#padRemove.style.cssText = `${SMALL};flex:1`;
      this.#padRemove.onclick = () => {
        if (this.#padAt !== void 0) this.#remove(this.#padAt);
      };
      this.#padUndo = document2.createElement("button");
      this.#padUndo.style.cssText = `${SMALL};flex:1`;
      this.#padUndo.onclick = () => {
        this.#closePad();
        actions.undoCorrections();
      };
      padFooter.append(this.#padRemove, this.#padUndo);
      const miss = document2.createElement("button");
      miss.style.cssText = `${PAD_KEY};width:100%;margin-top:4px`;
      miss.onclick = () => this.#send({ number: 0, ring: "OUT" });
      this.#padMiss = miss;
      this.#pad.append(padHeader, ringRow, nums, miss, padFooter);
      this.#settings = document2.createElement("div");
      this.#settings.style.cssText = "display:none";
      const settingsHeader = document2.createElement("div");
      settingsHeader.style.cssText = "display:flex;align-items:center;gap:6px;margin-top:6px";
      this.#settingsTitle = document2.createElement("div");
      this.#settingsTitle.style.cssText = "flex:1;font-weight:bold";
      this.#settingsBack = document2.createElement("button");
      this.#settingsBack.style.cssText = SMALL;
      this.#settingsBack.onclick = () => {
        this.#settingsOpen = false;
        this.#binding = void 0;
        this.#redraw();
      };
      settingsHeader.append(this.#settingsTitle, this.#settingsBack);
      const commitRow = document2.createElement("div");
      commitRow.style.cssText = SETTING_ROW;
      const commitLabel = document2.createElement("span");
      commitLabel.style.cssText = "flex:1;color:#9aa0a8";
      commitLabel.textContent = "";
      this.#commitButton = document2.createElement("button");
      this.#commitButton.style.cssText = `${SMALL};min-width:96px`;
      this.#commitButton.onclick = () => {
        actions.setCommitMode(this.#view?.commitMode === "auto" ? "confirm" : "auto");
      };
      commitRow.append(commitLabel, this.#commitButton);
      this.#commitLabel = commitLabel;
      this.#commitNote = document2.createElement("div");
      this.#commitNote.style.cssText = "margin:3px 0 6px;color:#8a8a8a";
      const slider = (min, max, apply) => {
        const row2 = document2.createElement("div");
        row2.style.cssText = SETTING_ROW;
        const name = document2.createElement("span");
        name.style.cssText = "width:76px;color:#9aa0a8";
        const input = document2.createElement("input");
        input.type = "range";
        input.min = String(Math.round(min * 100));
        input.max = String(Math.round(max * 100));
        input.step = "5";
        input.style.cssText = "flex:1;min-width:0;accent-color:#2f8f52";
        input.oninput = () => apply(Number(input.value) / 100);
        const value2 = document2.createElement("span");
        value2.style.cssText = "width:38px;text-align:right";
        row2.append(name, input, value2);
        return { row: row2, name, input, value: value2 };
      };
      const size = slider(MIN_SCALE, MAX_SCALE, (fraction) => actions.setScale(fraction));
      this.#sizeName = size.name;
      this.#sizeSlider = size.input;
      this.#sizeLabel = size.value;
      const fade = slider(MIN_OPACITY, MAX_OPACITY, (fraction) => actions.setOpacity(fraction));
      this.#opacityName = fade.name;
      this.#opacitySlider = fade.input;
      this.#opacityLabel = fade.value;
      const keyBox = document2.createElement("div");
      keyBox.style.cssText = "margin-top:8px;padding-top:6px;border-top:1px solid #333";
      for (const action of KEY_ACTIONS) {
        const line = document2.createElement("div");
        line.style.cssText = SETTING_ROW;
        const label = document2.createElement("span");
        label.style.cssText = "flex:1;color:#9aa0a8";
        const button = document2.createElement("button");
        button.style.cssText = `${SMALL};min-width:76px`;
        button.onclick = () => {
          this.#binding = this.#binding === action ? void 0 : action;
          this.#redraw();
        };
        line.append(label, button);
        keyBox.append(line);
        this.#keyRows.push({ action, label, button });
      }
      this.#keysHint = document2.createElement("div");
      this.#keysHint.style.cssText = "margin-top:6px;color:#8a8a8a";
      this.#settings.append(settingsHeader, commitRow, this.#commitNote, size.row, fade.row, keyBox, this.#keysHint);
      this.#scoreboard = document2.createElement("div");
      this.#scoreboard.style.cssText = SCOREBOARD;
      this.#scoreboard.append(this.#mode, this.#noticeLine, this.#slotRow, this.#statRow);
      root.append(header, this.#controls, this.#settings);
      for (const mine of [this.#scoreboard, this.#pad, root]) mine.setAttribute(PANEL_MARK, "");
      document2.body.appendChild(this.#scoreboard);
      document2.body.appendChild(this.#pad);
      document2.body.appendChild(root);
      this.#dragBy(this.#mode, actions);
      this.#pill = document2.createElement("div");
      this.#pill.style.cssText = PILL;
      this.#pill.setAttribute(PANEL_MARK, "");
      this.#pill.setAttribute("role", "button");
      this.#pill.onclick = () => actions.setCollapsed(false);
      this.#pillDot = document2.createElement("span");
      this.#pillDot.style.cssText = "width:9px;height:9px;border-radius:50%;display:inline-block;flex:0 0 auto";
      this.#pillScore = document2.createElement("span");
      this.#pillScore.style.cssText = "color:#9aa0a8";
      this.#pillLeft = document2.createElement("span");
      this.#pillLeft.style.cssText = "font-size:15px";
      this.#pillOut = document2.createElement("span");
      this.#pillOut.style.cssText = "color:#7fe0a0;letter-spacing:.02em";
      this.#pill.append(this.#pillDot, this.#pillScore, this.#pillLeft, this.#pillOut);
      document2.body.appendChild(this.#pill);
      document2.addEventListener("keydown", (event) => this.#onKey(event));
    }
    /**
     * Drags the scoreboard by `handle`.
     *
     * The pointer events are taken on the document rather than the handle, because a pointer that leaves a
     * 300px box mid-drag - which it does, every time - stops sending events to it. The position is stored
     * only on release: writing it on every move would be a storage write per pixel.
     */
    #dragBy(handle2, actions) {
      const document2 = handle2.ownerDocument;
      let from;
      handle2.addEventListener("pointerdown", (event) => {
        from = { x: event.clientX, y: event.clientY, at: this.#placed };
        this.#dragging = true;
        event.preventDefault();
      });
      document2.addEventListener("pointermove", (event) => {
        if (from === void 0) return;
        this.#place({ x: from.at.x + event.clientX - from.x, y: from.at.y + event.clientY - from.y });
      });
      const release = () => {
        if (from === void 0) return;
        from = void 0;
        this.#dragging = false;
        actions.setPosition(this.#placed);
      };
      document2.addEventListener("pointerup", release);
      document2.addEventListener("pointercancel", release);
    }
    /** The window's size, when the page will say - a stub environment may not. */
    #viewport() {
      const view = this.#scoreboard.ownerDocument.defaultView;
      return {
        width: typeof view?.innerWidth === "number" ? view.innerWidth : void 0,
        height: typeof view?.innerHeight === "number" ? view.innerHeight : void 0
      };
    }
    /** Puts the scoreboard somewhere, keeping enough of it on screen to be grabbed again. */
    #place(position2) {
      const { width, height } = this.#viewport();
      const x = width === void 0 ? position2.x : Math.min(Math.max(position2.x, 0), Math.max(0, width - EDGE));
      const y = height === void 0 ? position2.y : Math.min(Math.max(position2.y, 0), Math.max(0, height - EDGE));
      this.#placed = { x, y };
      this.#scoreboard.style.left = `${x}px`;
      this.#scoreboard.style.top = `${y}px`;
    }
    /**
     * The keyboard, which is what a person has free while holding darts.
     *
     * Order matters: the kill combo works under every circumstance, a key being bound is captured before
     * it can do its usual job, and anything else is only ours when nobody is typing into a field - n01's
     * scorer is an input, and taking Enter from a half-typed score would enter the wrong number.
     */
    #onKey(event) {
      if (event.ctrlKey && event.shiftKey && (event.key === "X" || event.key === "x")) {
        event.preventDefault();
        this.#actions.stop();
        return;
      }
      const binding = this.#binding;
      if (binding !== void 0) {
        if (!isBindable(event.key)) return;
        event.preventDefault();
        this.#binding = void 0;
        const keys2 = { ...this.#view?.keys ?? {}, [binding]: event.key };
        this.#actions.setKeys(keys2);
        return;
      }
      if (event.ctrlKey || event.altKey || event.metaKey) return;
      const view = this.#view;
      if (view === void 0 || view.collapsed || isTyping(event.target)) return;
      const action = actionFor(view.keys, event.key);
      if (action === void 0) return;
      event.preventDefault();
      if (action === "confirm") {
        this.#closeViews();
        this.#actions.confirmTurn();
        return;
      }
      const at = KEY_ACTIONS.indexOf(action) - 1;
      if (at >= 0 && at < view.slots.length) this.#openPad(at);
    }
    #closeViews() {
      this.#padAt = void 0;
      this.#settingsOpen = false;
      this.#binding = void 0;
    }
    render(view) {
      this.#view = view;
      this.#lang = view.lang;
      const t = (key, ...args) => panelText(this.#lang, key, ...args);
      const live = !view.dryRun && !view.paused;
      this.#shrink.title = t("collapse");
      this.#shrink.setAttribute("aria-label", t("collapse"));
      this.#copy.textContent = t("btnCopy");
      this.#copy.title = t("btnCopyHint");
      this.#langButton.textContent = t("langCode");
      this.#langButton.title = t("langSwitch");
      this.#langButton.setAttribute("aria-label", t("langSwitch"));
      this.#settingsButton.title = t("settings");
      this.#settingsButton.setAttribute("aria-label", t("settings"));
      const board2 = view.source === "board";
      this.#address.title = t(board2 ? "addressHintBoard" : "addressHint");
      this.#address.placeholder = board2 ? "http://127.0.0.1:3180" : "http://127.0.0.1:9210";
      this.#pill.title = t("expand");
      this.#panel.style.display = view.collapsed ? "none" : "";
      this.#pill.style.display = view.collapsed ? "flex" : "none";
      if (!this.#dragging) this.#place(view.position);
      const scale2 = clampScale(view.scale);
      const height = this.#viewport().height;
      this.#scoreboard.style.transform = scale2 === 1 ? "" : `scale(${scale2})`;
      this.#scoreboard.style.transformOrigin = "top left";
      const opacity2 = clampOpacity(view.opacity);
      this.#scoreboard.style.opacity = opacity2 === 1 ? "" : String(opacity2);
      if (this.#padAt !== void 0 && this.#padAt >= view.slots.length) this.#padAt = void 0;
      const padOpen = this.#padAt !== void 0;
      this.#slotRow.style.display = view.slots.length === 0 ? "none" : "flex";
      this.#pad.style.display = padOpen ? "" : "none";
      this.#controls.style.display = this.#settingsOpen ? "none" : "";
      this.#settings.style.display = this.#settingsOpen ? "" : "none";
      const room = typeof height === "number" ? Math.max(1, (height - 40) / PAD_HEIGHT) : scale2;
      const padScale = Math.min(scale2, room);
      this.#pad.style.transform = `translate(-50%, -50%)${padScale === 1 ? "" : ` scale(${padScale})`}`;
      const waiting = view.pending === void 0 ? "" : t("confirmWaiting", view.pending, keyLabel(view.keys.confirm));
      const line = waiting === "" ? view.notice : waiting;
      this.#noticeLine.style.display = line === "" ? "none" : "";
      this.#noticeLine.textContent = line;
      this.#noticeLine.style.color = waiting === "" ? EDITED : "#b8f5b8";
      if (view.slots.length > 0) this.#drawSlots(view.slots);
      if (padOpen) this.#drawPad(view.slots);
      if (this.#settingsOpen) this.#drawSettings(view);
      const [background, border, text3] = view.paused ? MODE_COLOURS.paused : live ? MODE_COLOURS.live : MODE_COLOURS.dry;
      this.#pillDot.style.background = view.connected ? border : "#a83a3a";
      this.#pillScore.textContent = view.turnDarts === 0 ? t("noScore") : String(view.turnScore);
      this.#pillLeft.textContent = view.pointsLeft === void 0 ? "" : String(view.pointsLeft);
      this.#pillLeft.style.color = text3;
      this.#pillOut.textContent = view.checkout === void 0 ? "" : view.checkout.join(" ");
      this.#mode.textContent = view.paused ? t("paused") : live ? t("live") : t("preview");
      this.#mode.title = t("dragHint");
      this.#mode.style.background = background;
      this.#mode.style.border = `1px solid ${border}`;
      this.#mode.style.color = text3;
      const sourceRow = board2 ? "rowBoard" : "rowBridge";
      const width = Math.max(...[sourceRow, "rowEvents", "rowLast"].map((key) => t(key).length));
      const row = (key, value2) => `${t(key).padEnd(width)}  ${value2}`;
      this.#thrownLabel.textContent = t("rowThrown");
      this.#thrownValue.textContent = String(slotTotal(view.slots));
      this.#thrownNote.textContent = t("ofDarts", slotDarts(view.slots));
      this.#leftLabel.textContent = t("rowLeft");
      this.#leftValue.textContent = view.pointsLeft === void 0 ? t("noScore") : String(view.pointsLeft);
      this.#leftValue.style.color = text3;
      this.#leftOut.textContent = view.pointsLeft === void 0 || view.checkout === void 0 ? t("noCheckout") : view.checkout.join(" ");
      this.#leftOut.style.color = view.checkout === void 0 ? "#8a8a8a" : "#7fe0a0";
      const detail = board2 ? view.boardState : view.cursor === void 0 ? "" : t("at", view.cursor);
      const done = board2 ? "" : ` \xB7 ${t("doneTo", view.lastSeq)}`;
      const lines = [
        row(sourceRow, `${view.connected ? t("connected") : t("offline")}${detail === "" ? "" : ` \xB7 ${detail}`}`),
        row("rowEvents", `${t("seenTurns", view.eventsSeen, view.turnsSeen)}${done}`),
        row("rowLast", describe(view.lastOutcome, this.#lang))
      ];
      if (view.paused && view.pauseReason !== "") lines.push(view.pauseReason);
      this.#title.textContent = `autodarts \u2192 ${view.scorer}  v${view.version} \xB7 ${view.build}`;
      this.#body.textContent = lines.join("\n");
      this.#primary.textContent = live ? t("btnStop") : t("btnStart");
      this.#primary.style.background = live ? "#7a2222" : "#1f6b3a";
      this.#primary.style.border = `1px solid ${live ? "#a83a3a" : "#2f8f52"}`;
      this.#primary.style.color = live ? "#ffecec" : "#eaffef";
      if (document.activeElement !== this.#address) this.#address.value = view.bridgeUrl;
      this.#logBox.textContent = [...view.log].slice(-LOG_LINES_SHOWN).reverse().join("\n");
    }
    /** One box per dart, rebuilt from scratch - see `#slotRow` for why nothing here is reused. */
    #drawSlots(slots) {
      const document2 = this.#slotRow.ownerDocument;
      const t = (key, ...args) => panelText(this.#lang, key, ...args);
      this.#slotRow.textContent = "";
      slots.forEach((slot, position2) => {
        const empty = slot.state === "empty";
        const edited2 = slot.state === "corrected" || slot.state === "added";
        const box = document2.createElement("div");
        const border = empty ? "dashed #3a3a3a" : `solid ${edited2 ? "#8a6a2a" : "#444"}`;
        box.style.cssText = `${SLOT};border:1px ${border}`;
        box.title = empty ? t("slotAddHint") : t("slotCorrectHint");
        box.onclick = () => this.#openPad(position2);
        const name = document2.createElement("div");
        name.style.cssText = SLOT_NAME;
        name.style.color = empty ? "#6a6a6a" : edited2 ? EDITED : "#eee";
        name.textContent = empty ? "+" : slot.label;
        const points = document2.createElement("div");
        points.style.cssText = SLOT_META;
        points.textContent = empty ? "" : String(slot.score);
        const note = document2.createElement("div");
        note.style.cssText = SLOT_META;
        if (edited2) note.style.color = EDITED;
        note.textContent = slot.boardSaid !== void 0 ? t("slotBoardSaid", slot.boardSaid) : slot.state === "added" ? t("slotAdded") : slot.state === "bounced" ? t("slotBounced") : "";
        box.append(name, points, note);
        if (!empty) {
          const kill = document2.createElement("span");
          kill.style.cssText = SLOT_KILL;
          kill.textContent = "\xD7";
          kill.title = t("btnRemoveHint");
          kill.onclick = (event) => {
            event.stopPropagation();
            this.#remove(position2);
          };
          box.append(kill);
        }
        this.#slotRow.append(box);
      });
    }
    #drawPad(slots) {
      const t = (key, ...args) => panelText(this.#lang, key, ...args);
      const at = this.#padAt ?? 0;
      const adding = slots[at]?.state === "empty";
      this.#padTitle.textContent = adding ? t("padAdd") : t("padCorrect", at + 1);
      this.#padBack.textContent = t("btnBack");
      this.#padMiss.textContent = t("padMiss");
      this.#padRemove.textContent = t("btnRemove");
      this.#padRemove.title = t("btnRemoveHint");
      this.#padRemove.style.display = adding ? "none" : "";
      this.#padUndo.textContent = t("btnUndo");
      this.#padUndo.title = t("btnUndoHint");
      this.#padBull.style.display = this.#ring === "T" ? "none" : "";
      this.#padRings.forEach((button, index) => {
        const ring = RINGS2[index];
        const on = ring === this.#ring;
        button.title = t(ring === "D" ? "ringDouble" : ring === "T" ? "ringTriple" : "ringSingle");
        button.style.background = on ? "#1f3b2a" : "#222";
        button.style.borderColor = on ? "#2f8f52" : "#555";
        button.style.color = on ? "#eaffef" : "#eee";
      });
    }
    /** Everything you set once: how a turn gets entered, how big the panel is, and which keys do what. */
    #drawSettings(view) {
      const t = (key, ...args) => panelText(this.#lang, key, ...args);
      const auto = view.commitMode === "auto";
      this.#settingsTitle.textContent = t("settings");
      this.#settingsBack.textContent = t("btnBack");
      this.#commitLabel.textContent = t("commitLabel");
      this.#commitButton.textContent = auto ? t("commitAuto") : t("commitConfirm");
      this.#commitNote.textContent = auto ? t("commitAutoNote") : t("commitConfirmNote", keyLabel(view.keys.confirm));
      const percent = (element, fraction) => {
        const value2 = String(Math.round(fraction * 100));
        if (element.value !== value2) element.value = value2;
        return `${value2}%`;
      };
      this.#sizeName.textContent = t("size");
      this.#sizeLabel.textContent = percent(this.#sizeSlider, clampScale(view.scale));
      this.#opacityName.textContent = t("opacity");
      this.#opacityLabel.textContent = percent(this.#opacitySlider, clampOpacity(view.opacity));
      for (const [index, key] of this.#keyRows.entries()) {
        const arming = this.#binding === key.action;
        key.label.textContent = t(index === 0 ? "keyConfirm" : "keyDart", index);
        key.button.textContent = arming ? t("pressAKey") : keyLabel(view.keys[key.action]);
        key.button.style.borderColor = arming ? "#2f8f52" : "#555";
      }
      this.#keysHint.textContent = t("keysHint");
    }
    #openPad(position2) {
      this.#padAt = position2;
      this.#settingsOpen = false;
      this.#redraw();
    }
    #closePad() {
      this.#padAt = void 0;
      this.#redraw();
    }
    /** A pressed key. The box it belongs to is all the panel has to say - the turn resolves the rest. */
    #send(segment) {
      const at = this.#padAt;
      if (at === void 0) return;
      this.#closePad();
      this.#actions.correctDart(at, segment);
    }
    #remove(position2) {
      this.#closePad();
      this.#actions.removeDart(position2);
    }
    #redraw() {
      if (this.#view !== void 0) this.render(this.#view);
    }
    /** Copies the log with enough context around it to be worth pasting into a message. */
    async #copyLog(document2) {
      const view = this.#view;
      if (view === void 0) return;
      const t = (key, ...args) => panelText(this.#lang, key, ...args);
      const report = [
        `version ${view.version}`,
        `build ${view.build}`,
        `page ${location.href}`,
        `${view.source} ${view.bridgeUrl} ${view.connected ? t("connected") : t("offline")}${view.boardState === "" ? "" : ` \xB7 ${view.boardState}`}`,
        `mode ${view.paused ? t("paused") : view.dryRun ? t("preview") : t("live")}`,
        `events ${view.eventsSeen} turns ${view.turnsSeen} seq ${view.lastSeq}`,
        "",
        ...view.log
      ].join("\n");
      const done = (ok2) => {
        this.#copy.textContent = ok2 ? t("copied") : t("copyFailed");
        setTimeout(() => {
          this.#copy.textContent = t("btnCopy");
        }, 1500);
      };
      try {
        await navigator.clipboard.writeText(report);
        done(true);
        return;
      } catch {
      }
      const scratch = document2.createElement("textarea");
      scratch.value = report;
      scratch.style.cssText = "position:fixed;left:-9999px;top:0";
      document2.body.appendChild(scratch);
      scratch.select();
      let ok = false;
      try {
        ok = document2.execCommand("copy");
      } catch {
        ok = false;
      }
      scratch.remove();
      done(ok);
    }
  };
  function describe(outcome, lang2) {
    const t = (key, ...args) => panelText(lang2, key, ...args);
    if (outcome === void 0) return t("nothingYet");
    switch (outcome.act) {
      case "awaiting-confirm":
        return t("waitingConfirm", outcome.total, outcome.darts);
      case "entered":
        return t("entered", value(outcome.plan, lang2), outcome.left) + where(outcome.plan, lang2);
      case "would-enter":
        return t("wouldEnter", value(outcome.plan, lang2)) + where(outcome.plan, lang2);
      case "awaiting":
        return `${t("sent", value(outcome.plan, lang2))}
         ` + (outcome.plan.kind === "checkout" ? t("confirmCheckout", outcome.plan.darts) : outcome.detail);
      case "failed":
        return t("failed", outcome.detail);
      case "skipped":
        return t("skipped", outcome.rejection.reason) + (outcome.rejection.detail === void 0 ? "" : `
         ${outcome.rejection.detail}`);
    }
  }
  var where = (plan, lang2) => `
         ${panelText(lang2, "into", plan.target)}${plan.warning === void 0 ? "" : ` - ${plan.warning}`}`;
  var value = (plan, lang2) => {
    if (plan.kind === "checkout") return panelText(lang2, "outIn", plan.total, plan.darts);
    if (plan.kind !== "bust") return String(plan.total);
    if (plan.why === "leaves-one") return panelText(lang2, "bustLeavesOne");
    if (plan.why === "not-a-double") return panelText(lang2, "bustNotDouble", plan.total);
    return panelText(lang2, "bustOver", plan.expectedLeft);
  };

  // sink/main.ts
  var BRIDGE_URL_KEY = "n01-sink:bridge-url";
  var COLLAPSED_KEY = "n01-sink:collapsed";
  var LANG_KEY = "n01-sink:lang";
  var COMMIT_KEY = "n01-sink:commit-mode";
  var KEYS_KEY = "n01-sink:keys";
  var SCALE_KEY = "n01-sink:scale";
  var OPACITY_KEY = "n01-sink:opacity";
  var POSITION_KEY = "n01-sink:position";
  var DEFAULT_SOURCE_URL = "http://127.0.0.1:3180";
  var SOURCE_NAME = true ? "board" : "app";
  var LOG_LINES = 200;
  var sourceUrl = gmStorage.read(BRIDGE_URL_KEY) ?? DEFAULT_SOURCE_URL;
  var settings = sharedSettings(gmStorage, pageStorage());
  var recent = [];
  var clock = () => (/* @__PURE__ */ new Date()).toTimeString().slice(0, 8);
  var log = (message, fields) => {
    if (fields === void 0) console.log("[n01-sink]", message);
    else console.log("[n01-sink]", message, fields);
    recent.push(`${clock()} ${message}`);
    while (recent.length > LOG_LINES) recent.shift();
    draw();
  };
  var onDartCounter = location.hostname.startsWith("app.dartcounter");
  var scorer = onDartCounter ? new DomDartCounter(pageQuery(document)) : new PostMessageN01({ target: window, storage: localStorage });
  var SCORER_NAME = onDartCounter ? "DartCounter" : "n01";
  var commitMode = settings.read(COMMIT_KEY) === "confirm" ? "confirm" : "auto";
  var seqStore = gmStorage;
  if (true) {
    const perLoad = /* @__PURE__ */ new Map();
    seqStore = {
      read: (key) => perLoad.get(key),
      write: (key, value2) => {
        perLoad.set(key, value2);
      }
    };
  }
  var sink = new Sink({ scorer, storage: seqStore, log, dryRun: true, commitMode });
  var connected = false;
  var cursor;
  var board;
  var collapsed = settings.read(COLLAPSED_KEY) === "1";
  var keys = parseKeys(settings.read(KEYS_KEY));
  var scale = clampScale(Number(settings.read(SCALE_KEY) ?? "1"));
  var opacity = clampOpacity(Number(settings.read(OPACITY_KEY) ?? "1"));
  var position = readPosition(settings.read(POSITION_KEY));
  function readPosition(stored2) {
    if (stored2 === void 0) return DEFAULT_POSITION;
    try {
      const parsed = JSON.parse(stored2);
      if (typeof parsed !== "object" || parsed === null) return DEFAULT_POSITION;
      const { x, y } = parsed;
      if (typeof x !== "number" || typeof y !== "number") return DEFAULT_POSITION;
      return { x, y };
    } catch {
      return DEFAULT_POSITION;
    }
  }
  var stored = settings.read(LANG_KEY);
  var lang = stored === "pl" || stored === "en" ? stored : panelLang(navigator.language);
  var turn = new LocalTurn();
  var notice = "";
  var NOTICE_MS = 6e3;
  var say = (text3) => {
    notice = text3;
    draw();
    setTimeout(() => {
      if (notice !== text3) return;
      notice = "";
      draw();
    }, NOTICE_MS);
  };
  var edited = (result, what) => {
    if (result.ok) {
      log(what);
      notice = "";
    } else if (result.reason === "committed") {
      say(panelText(lang, "correctTooLate"));
    } else {
      say(panelText(lang, "correctionRefused", result.detail ?? ""));
    }
    sink.noteBoardTurn(turn.total, turn.count);
    draw();
  };
  var widget = new Widget(document, {
    correctDart: (position2, segment) => {
      edited(turn.replace(position2, segment), `dart ${position2 + 1} corrected to ${segment.ring}${segment.number}`);
    },
    removeDart: (position2) => {
      edited(turn.remove(position2), `dart ${position2 + 1} removed`);
    },
    undoCorrections: () => {
      edited(turn.undo(), "corrections dropped");
    },
    confirmTurn: () => {
      if (sink.pending === void 0 && turn.count === 0) {
        say(panelText(lang, "nothingToEnter"));
        return;
      }
      void sink.enterNow(turn.darts).then(() => {
        notice = "";
        draw();
      });
    },
    setCommitMode: (mode) => {
      sink.setCommitMode(mode);
      settings.write(COMMIT_KEY, mode);
      draw();
    },
    setKeys: (next) => {
      keys = next;
      settings.write(KEYS_KEY, serializeKeys(next));
      draw();
    },
    setScale: (next) => {
      scale = clampScale(next);
      settings.write(SCALE_KEY, String(scale));
      draw();
    },
    setOpacity: (next) => {
      opacity = clampOpacity(next);
      settings.write(OPACITY_KEY, String(opacity));
      draw();
    },
    setPosition: (next) => {
      position = next;
      settings.write(POSITION_KEY, JSON.stringify(next));
      draw();
    },
    start: () => {
      if (sink.paused) sink.resume();
      sink.setDryRun(false);
      log("live - scores are being entered");
    },
    stop: () => {
      sink.setDryRun(true);
      log(`stopped - back to preview (${KILL_COMBO})`);
    },
    setCollapsed: (next) => {
      collapsed = next;
      settings.write(COLLAPSED_KEY, next ? "1" : "0");
      draw();
    },
    setLang: (next) => {
      lang = next;
      settings.write(LANG_KEY, next);
      draw();
    },
    setBridgeUrl: (url) => {
      const trimmed = url.trim();
      if (!/^https?:\/\//.test(trimmed)) {
        log(`the ${SOURCE_NAME} address must start with http://`);
        return;
      }
      gmStorage.write(BRIDGE_URL_KEY, trimmed);
      log(`saved ${trimmed} - reloading`);
      setTimeout(() => location.reload(), 400);
    }
  });
  var TURN_DARTS = 3;
  function awaitingConfirm() {
    if (sink.commitMode !== "confirm") return void 0;
    if (sink.pending !== void 0) return sink.pending;
    if (sink.entered || turn.count === 0) return void 0;
    return turn.count >= TURN_DARTS || sink.pointsLeft === 0 ? turn.total : void 0;
  }
  function draw() {
    widget.render({
      slots: turn.slots,
      notice,
      commitMode: sink.commitMode,
      pending: awaitingConfirm(),
      keys,
      scale,
      opacity,
      position,
      connected,
      cursor,
      eventsSeen: sink.eventsSeen,
      turnsSeen: sink.turnsSeen,
      dryRun: sink.dryRun,
      paused: sink.paused,
      pauseReason: sink.pauseReason,
      lastSeq: sink.lastSeq,
      lastOutcome: sink.lastOutcome,
      log: recent,
      build: "202608131935-4954d12",
      version: "0.3",
      source: "board",
      scorer: SCORER_NAME,
      bridgeUrl: sourceUrl,
      boardState: boardLine(),
      collapsed,
      lang,
      turnScore: sink.turnScore,
      turnDarts: sink.turnDarts,
      pointsLeft: sink.pointsLeft,
      // Suggested only while a finish is actually on: no path, nothing shown.
      checkout: sink.pointsLeft === void 0 ? void 0 : getCheckout(sink.pointsLeft, sink.dartsLeft)
    });
  }
  var handle = async (event) => {
    if (event.type === "hello" || event.type === "board-status") {
      board = { status: event.status, connected: event.connected, running: event.running };
    }
    await sink.handle(turn.observe(event));
    sink.noteBoardTurn(turn.total, turn.count);
    draw();
  };
  function boardLine() {
    if (board === void 0) return "";
    if (!board.connected) return panelText(lang, "boardOffline");
    return board.running ? board.status : `${board.status} \xB7 ${panelText(lang, "notRunning")}`;
  }
  async function startBoard() {
    if (gmStorage.read(BRIDGE_URL_KEY) === void 0) {
      const found = await findBoard();
      if (found === void 0) {
        log(`no board answered - trying ${sourceUrl}`);
      } else {
        sourceUrl = found.url;
        log(`board at ${found.url} \xB7 ${found.hostname} \xB7 client ${found.version}`);
      }
      draw();
    }
    new BoardPoll(
      sourceUrl,
      {
        onEvent: handle,
        onUp: () => {
          connected = true;
          log(`reading the board at ${sourceUrl}`);
        },
        onDown: (reason) => {
          connected = false;
          log(`board unreachable: ${reason}`);
        }
      },
      log
    ).start();
  }
  var IDLE_READ_MS = 1200;
  function boot(startSource) {
    draw();
    startSource();
    let reading = false;
    setInterval(() => {
      if (reading || turn.count > 0) return;
      reading = true;
      void sink.refreshLeft().then(() => {
        reading = false;
        draw();
      });
    }, IDLE_READ_MS);
    log(`v${"0.3"} \xB7 build ${"202608131935-4954d12"} \xB7 preview \xB7 ${KILL_COMBO} stops`);
  }

  // sink/entry-board.ts
  boot(() => void startBoard());
})();
