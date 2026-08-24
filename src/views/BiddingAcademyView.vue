<script setup lang="ts">
import { ref } from 'vue'
import MermaidDiagram from '../components/MermaidDiagram.vue'
import SourceTag from '../components/SourceTag.vue'

const tab = ref('overview')

const apfa = { kind: 'apfa' as const, label: 'APFA Website' }
const cba = (reference: string) => ({ kind: 'contract' as const, label: 'AA/APFA Contract', reference })

const overviewFlow = `flowchart TD
  FA["Flight Attendant"] --> LH["LINEHOLDER<br/>awarded a line of trips<br/>for the whole month"]
  FA --> RSV["RESERVE<br/>awarded standby availability<br/>(RAP days, Golden + Flex Days off)"]
  LH --> M["MONTHLY BIDDING: PBS<br/>then reshape with TTS / UBL / ETB"]
  RSV --> D["MONTHLY BIDDING: PBS reserve line<br/>then ROTA (tomorrow) + ROTD (today)"]`

const monthlyFlow = `flowchart TD
  A["Pairings for next month are built<br/>by Workforce Planning"] --> B["Bid package published in PBS<br/>by the 8th, 1200 DFW"]
  B --> C["You submit ranked preferences (layers)<br/>most important in Layer 1"]
  C --> D["PBS awards in SENIORITY order:<br/>legalities first, preferences second"]
  D --> E["Award published<br/>Line of Time or Reserve line"]`

const dailyFlow = `flowchart TD
  A["Every day of the month"] --> B["TTS daily run<br/>processes drops / pickups / trades<br/>+ UBL second-chance lists"]
  B --> C["ETB all day<br/>instant first-come, first-served trades"]
  C --> D["Leftover trips = Open Time"]
  D --> E["ROTA at 1500: covers TOMORROW<br/>results by 1930, acknowledge by 2230 HBT"]
  D --> F["ROTD: covers TODAY<br/>aggressive bids, standby, LMCO"]`

const ttsTabs = [
  {
    title: 'What you can ask for',
    points: [
      'Drop a trip from your schedule',
      'Pick up a trip from open time (within your Credit Window)',
      'Trade one of your trips for another trip',
    ],
  },
  {
    title: 'How it runs',
    points: [
      'You build a ballot: one request with ranked choices',
      'TTS processes ballots in scheduled daily runs',
      'Check Run History for awarded / denied results and reasons',
    ],
  },
  {
    title: 'Guardrails',
    points: [
      'Every pickup must fit inside your Credit Window',
      'Daily and monthly open-time limits apply',
      'Legality (rest, duty limits) is checked for everyone involved',
    ],
  },
]

const redFlagPremiumRows = [
  { tx: 'Pickup only', flag: 'Red Flag premium paid', detail: 'Simplest case — you just pick up a flagged trip' },
  { tx: 'Trade: Red Flag for Red Flag', flag: 'Premium paid', detail: 'Even with same-day origination or multi-day overlap' },
  { tx: 'Trade: normal trip → Red Flag, no overlap (or overlaps only 1 day)', flag: 'Premium paid', detail: 'Overlap = shared calendar day (0000–2359 HBT)' },
  { tx: 'Trade: normal trip → Red Flag, same origination date or overlaps 2+ days', flag: 'Trip awarded, NO premium', detail: 'CBA 10.H.7 anti-gaming rule' },
]

const reserveCalendarRows = [
  { item: 'Lineholder Calendar', detail: 'Shows your awarded trips and days off — the month is fixed unless you change it via TTS/ETB' },
  { item: 'Reserve Calendar', detail: '“Reserve Days Off” view adds projected reserve-demand numbers per day (e.g., spikes near Christmas) so you can pick smart off-day patterns' },
  { item: 'Off-day pattern', detail: 'APFA guidance: place all 12 off days in Layers 6–7, keep off days in blocks of 2–8, available stretches 3–6 days, aim for 4+ Flex Days' },
  { item: 'Layer priority', detail: 'Layer 1 = most important. Never skip a layer — a skipped layer fills with ALL pairings. Days inside one layer are equal priority' },
]
</script>

<template>
  <v-container fluid class="pa-8" style="max-width: 1150px">
    <h1 class="text-h4 font-weight-bold mb-2">Bidding Academy</h1>
    <p class="text-body-1 text-medium-emphasis mb-6">
      How Flight Attendants get, change, and protect their flying — structured the same way APFA
      teaches it: Monthly Bidding, Daily Bidding (TTS · UBL · ETB), Red Flag, Reserve, and Calendars.
    </p>

    <v-tabs
      v-model="tab"
      color="primary"
      density="comfortable"
      class="mb-6"
      show-arrows
    >
      <v-tab value="overview" prepend-icon="mdi-sitemap">Overview</v-tab>
      <v-tab value="monthly" prepend-icon="mdi-calendar-month">Monthly Bidding</v-tab>
      <v-tab value="daily" prepend-icon="mdi-rotate-360">Daily Bidding</v-tab>
      <v-tab value="redflag" prepend-icon="mdi-flag">Red Flag</v-tab>
      <v-tab value="reserve" prepend-icon="mdi-phone-incoming">Reserve (ROTA/ROTD)</v-tab>
      <v-tab value="calendar" prepend-icon="mdi-calendar-blank">Calendars</v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <!-- ================= OVERVIEW ================= -->
      <v-window-item value="overview">
        <v-alert type="info" variant="tonal" class="mb-6" icon="mdi-account-split-horizontal">
          There are exactly two kinds of schedules. Every Flight Attendant bids in PBS for one of them:
          <strong>Lineholder</strong> (a month of concrete trips) or <strong>Reserve</strong>
          (standby availability). Everything else in bidding follows from which one you hold.
          <div class="mt-2">
            <SourceTag :source="cba('§12.A.1')" />
          </div>
        </v-alert>

        <MermaidDiagram :code="overviewFlow" caption="Two crew types, two worlds of bidding" />

        <v-row class="mt-4">
          <v-col cols="12" md="6">
            <v-card variant="tonal" color="primary" height="100%">
              <v-card-text>
                <div class="text-subtitle-1 font-weight-bold mb-2">Lineholder — monthly world</div>
                <p class="text-body-2 mb-0">
                  PBS gives you a Line of Time (70–90 hrs of trips). After the award you reshape it:
                  <strong>TTS</strong> for drops/pickups/trades in daily runs, <strong>UBL</strong> for a
                  second chance in those same runs, <strong>ETB</strong> to trade instantly any time.
                </p>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card variant="tonal" color="secondary" height="100%">
              <v-card-text>
                <div class="text-subtitle-1 font-weight-bold mb-2">Reserve — future + daily world</div>
                <p class="text-body-2 mb-0">
                  PBS gives you a Reserve line (RAP availability + Golden/Flex Days off).
                  <strong>ROTA</strong> covers tomorrow's gaps (runs once daily),
                  <strong>ROTD</strong> covers today (continuous). Aggressive bids and LMCO let you
                  volunteer for early call-outs.
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-window-item>

      <!-- ================= MONTHLY ================= -->
      <v-window-item value="monthly">
        <v-alert variant="tonal" density="compact" class="mb-6" icon="mdi-information-outline">
          <strong>PBS in one sentence:</strong> PBS does not create trips — Workforce Planning builds
          the pairings first. PBS only assembles those pairings into legal lines, honoring seniority.
          <div class="mt-2 d-flex ga-2 flex-wrap">
            <SourceTag :source="apfa" />
            <SourceTag :source="cba('§10.C–D')" />
          </div>
        </v-alert>

        <MermaidDiagram :code="monthlyFlow" caption="Monthly cycle: pairings → package → preferences → seniority award" />

        <v-row>
          <v-col cols="12" md="7">
            <v-card variant="outlined" height="100%">
              <v-card-title class="text-subtitle-1 font-weight-bold">How preferences work (layers)</v-card-title>
              <v-card-text>
                <v-list density="compact" class="py-0">
                  <v-list-item prepend-icon="mdi-numeric-1-box-outline" title="Layer 1 = your top priority"
                    subtitle="PBS works layer by layer; days/trips inside one layer are equal" />
                  <v-list-item prepend-icon="mdi-layers-triple" title="Never skip a layer"
                    subtitle="A skipped layer auto-fills with ALL pairings — a classic bad-award cause" />
                  <v-list-item prepend-icon="mdi-calendar-range" title="Work blocks"
                    subtitle="Consecutive working days between full days off (default 1–6); ranges only loosen in later layers, never tighten" />
                  <v-list-item prepend-icon="mdi-check-decagram" title="Legalities first"
                    subtitle="Rest, duty limits and staffing are satisfied before any preference is honored" />
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="5">
            <v-card variant="outlined" height="100%">
              <v-card-title class="text-subtitle-1 font-weight-bold">Key dates</v-card-title>
              <v-card-text>
                <v-timeline side="end" density="compact" truncate-line="both" class="mt-1">
                  <v-timeline-item size="x-small" dot-color="primary">
                    <strong>By the 8th</strong> (prior month, 1200 DFW) — bid package published
                  </v-timeline-item>
                  <v-timeline-item size="x-small" dot-color="primary">
                    <strong>Mid-month</strong> — PBS opens; submit ranked preferences
                  </v-timeline-item>
                  <v-timeline-item size="x-small" dot-color="success">
                    <strong>Award</strong> — lines published; misawards get their own remedy process
                  </v-timeline-item>
                </v-timeline>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-window-item>

      <!-- ================= DAILY ================= -->
      <v-window-item value="daily">
        <v-alert variant="tonal" density="compact" class="mb-6" icon="mdi-rotate-360">
          <strong>Daily bidding = three tools running every day:</strong> TTS (scheduled runs),
          UBL (your retry list inside those runs), ETB (instant trades).
          <div class="mt-2 d-flex ga-2 flex-wrap">
            <SourceTag :source="apfa" />
            <SourceTag :source="cba('§10.E–K, §2.GG')" />
          </div>
        </v-alert>

        <MermaidDiagram :code="dailyFlow" caption="Where uncovered trips go each day" />

        <v-row class="mt-2">
          <v-col cols="12" md="4">
            <v-card height="100%" variant="elevated">
              <v-toolbar density="compact" color="primary">
                <v-toolbar-title class="text-subtitle-1 font-weight-bold">TTS — Trip Trade System</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <div v-for="grp in ttsTabs" :key="grp.title" class="mb-3">
                  <div class="text-caption font-weight-bold text-primary mb-1">{{ grp.title.toUpperCase() }}</div>
                  <ul class="pl-5 ma-0 text-body-2">
                    <li v-for="p in grp.points" :key="p" class="mb-1">{{ p }}</li>
                  </ul>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card height="100%" variant="elevated">
              <v-toolbar density="compact" color="secondary">
                <v-toolbar-title class="text-subtitle-1 font-weight-bold">UBL — Unsuccessful Bidder's List</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <p class="text-body-2">
                  If your TTS request was denied, you can elect to <strong>“pass to UBL”</strong>.
                  Your request then stays alive and is re-considered in later daily runs whenever
                  matching open time appears — no need to re-submit.
                </p>
                <v-list density="compact" class="py-0 text-body-2">
                  <v-list-item prepend-icon="mdi-refresh" title="Automatic retries"
                    subtitle="Processed in the daily run, after fresh ballots" />
                  <v-list-item prepend-icon="mdi-close-circle-outline" title="You stay in control"
                    subtitle="Remove the election any time; it also clears once satisfied" />
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card height="100%" variant="elevated">
              <v-toolbar density="compact" color="accent">
                <v-toolbar-title class="text-subtitle-1 font-weight-bold">ETB — Electronic Trade Board</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <p class="text-body-2">
                  A real-time board for drops, pickups and trades —
                  <strong>first come, first served</strong>. No waiting for the next run: if you see it
                  and you're legal, it's yours the moment you click.
                </p>
                <v-list density="compact" class="py-0 text-body-2">
                  <v-list-item prepend-icon="mdi-lightning-bolt" title="Instant validation"
                    subtitle="Legality and Credit Window checked at click time" />
                  <v-list-item prepend-icon="mdi-account-group" title="FA-to-FA trades"
                    subtitle="Swap trips directly with colleagues, including vacation trades" />
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-window-item>

      <!-- ================= RED FLAG ================= -->
      <v-window-item value="redflag">
        <v-alert type="warning" variant="tonal" density="comfortable" class="mb-6" icon="mdi-flag">
          <strong>Red Flag</strong> = a hard-to-cover open-time sequence that pays a
          <strong>150% premium</strong> (credited at 100%). Bases offer red-flag flying via a
          <strong>Crew Portal banner</strong>; it stays available for the rest of the month — not just
          today/tomorrow. Once flagged, Crew Scheduling cannot remove the flag (and its premium)
          until after <strong>0400 HBT one day before departure</strong>.
          <div class="mt-2 d-flex ga-2 flex-wrap">
            <SourceTag :source="apfa" />
            <SourceTag :source="cba('§2.RR')" />
          </div>
        </v-alert>

        <div class="text-subtitle-1 font-weight-bold mb-2">Bidding red flags in TTS</div>
        <p class="text-body-2 text-medium-emphasis mb-4">
          In TTS, tick <em>“Only Red Flag Sequences”</em> to see and ballot for currently flagged trips.
          You can even bid to accept a sequence <em>only if it becomes</em> red-flagged, at three levels:
          <strong>Entire Ballot</strong>, <strong>All Choices in one request</strong>, or a
          <strong>Single Choice</strong>. If it isn't flagged at run time, you don't get it — the denial
          reason shows in Run History.
        </p>

        <v-card variant="outlined" class="mb-6">
          <v-card-title class="text-subtitle-1 font-weight-bold">When is the premium paid?</v-card-title>
          <v-divider />
          <v-table>
            <thead>
              <tr><th>Transaction</th><th>Premium?</th><th>Why</th></tr>
            </thead>
            <tbody>
              <tr v-for="r in redFlagPremiumRows" :key="r.tx">
                <td>{{ r.tx }}</td>
                <td>
                  <v-chip :color="r.flag.includes('NO') ? 'warning' : 'success'" size="small" variant="tonal">
                    {{ r.flag }}
                  </v-chip>
                </td>
                <td class="text-medium-emphasis">{{ r.detail }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-card>

        <v-card variant="tonal" color="secondary">
          <v-card-text>
            <div class="text-subtitle-1 font-weight-bold mb-2">Red flags for Reserves (ROTA / ROTD)</div>
            <ul class="pl-5 ma-0 text-body-2">
              <li class="mb-1">Released from Reserve (called out of time within 5 hrs of monthly max) or on days off → you can earn red-flag premium on ROTA/ROTD awards.</li>
              <li class="mb-1">Still on availability? You may be awarded <strong>one</strong> trip above your monthly max — but <strong>no premium</strong>.</li>
              <li class="mb-1">Bid generic or specific red-flag sequences; released days may need recoding (e.g., as GD) by Crew Scheduling.</li>
              <li class="mb-0">ROTA path: Reserve Bidding page → <em>Pick Up on FD/GD Bids</em> tab → apply waivers → pick date → add bid.</li>
            </ul>
          </v-card-text>
        </v-card>
      </v-window-item>

      <!-- ================= RESERVE ================= -->
      <v-window-item value="reserve">
        <v-alert variant="tonal" density="compact" class="mb-6" icon="mdi-phone-incoming">
          <strong>ROTA covers tomorrow. ROTD covers today.</strong>
          <div class="mt-2 d-flex ga-2 flex-wrap">
            <SourceTag :source="apfa" />
            <SourceTag :source="cba('§12.K/J, §2.UU/VV')" />
          </div>
        </v-alert>

        <v-row>
          <v-col cols="12" md="6">
            <v-card height="100%" variant="elevated">
              <v-toolbar density="compact" color="primary">
                <v-toolbar-title class="text-subtitle-1 font-weight-bold">ROTA — future (tomorrow)</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-list density="compact" class="py-0 text-body-2">
                  <v-list-item prepend-icon="mdi-clock-time-four" title="Runs once daily at 1500 HBT"
                    subtitle="Processing complete by 1930; awards open time + all RAPs" />
                  <v-list-item prepend-icon="mdi-check-circle" title="Acknowledge by 2230 HBT"
                    subtitle="Or within 1 hr of release if flying — otherwise it counts as a missed trip" />
                  <v-list-item prepend-icon="mdi-shield-account" title="Waivers you may attach"
                    subtitle="35-in-7, home-base rest to FAR minimum, work into Golden/Flex days, more" />
                  <v-list-item prepend-icon="mdi-cached" title="Standing bids persist"
                    subtitle="Until you delete them — but any current bid overrides them" />
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card height="100%" variant="elevated">
              <v-toolbar density="compact" color="secondary">
                <v-toolbar-title class="text-subtitle-1 font-weight-bold">ROTD — day-of (today)</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-list density="compact" class="py-0 text-body-2">
                  <v-list-item prepend-icon="mdi-autorenew" title="Continuous processing"
                    subtitle="Runs after UBL and whenever new trips drop during the day" />
                  <v-list-item prepend-icon="mdi-phone-dial" title="Call-out rules"
                    subtitle="Positive contact starts a 15-min callback, then ~2 hrs to report (LMCO can shorten)" />
                  <v-list-item prepend-icon="mdi-order-numeric-ascending" title="Award vs Assign"
                    subtitle="Award = you got what you bid. Assign = scheduling gave you something else (RAP → grouping → clicks → seniority)" />
                  <v-list-item prepend-icon="mdi-bed-clock" title="End of RAP"
                    subtitle="Unassigned at RAP end = released; RAP before a day off ends by 2359" />
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-card variant="tonal" color="primary" class="mt-4">
          <v-card-text>
            <div class="text-subtitle-1 font-weight-bold mb-2">Aggressive bids &amp; LMCO</div>
            <p class="text-body-2 mb-2">
              <strong>Aggressive ROTD bids</strong> volunteer you for early assignments using your
              waivers. <strong>LMCO</strong> (“Less Than Minimum Call-Out”) goes further: you waive part
              of the standard 2-hour call-out (3-hour co-terminal) by entering the minimum minutes you
              can make — e.g., “:45” makes you eligible for departures 45+ minutes out.
            </p>
            <ul class="pl-5 ma-0 text-body-2">
              <li>LMCO is used when no standby can cover, and is processed <strong>before</strong> assigning legal standbys</li>
              <li>Daily bids only — no standing LMCO bids, and you're never <em>assigned</em> LMCO</li>
              <li>No 15-minute wait: if you don't answer, you're returned to RAP — no pay protection, no penalty</li>
            </ul>
          </v-card-text>
        </v-card>
      </v-window-item>

      <!-- ================= CALENDARS ================= -->
      <v-window-item value="calendar">
        <v-alert variant="tonal" density="compact" class="mb-6" icon="mdi-calendar-blank">
          PBS shows a different calendar depending on what you hold — and the
          <strong>Reserve Calendar</strong> is the Reserve's secret weapon: it shows projected
          demand per day.
          <div class="mt-2"><SourceTag :source="apfa" /></div>
        </v-alert>

        <v-card variant="outlined">
          <v-table>
            <thead>
              <tr><th style="width: 220px">Calendar / concept</th><th>What it tells you</th></tr>
            </thead>
            <tbody>
              <tr v-for="r in reserveCalendarRows" :key="r.item">
                <td class="font-weight-bold">{{ r.item }}</td>
                <td>{{ r.detail }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-card>

        <v-card variant="tonal" color="success" class="mt-4">
          <v-card-text>
            <div class="text-subtitle-1 font-weight-bold mb-1">Simple bidding recipe (APFA-style)</div>
            <ol class="pl-5 ma-0 text-body-2">
              <li>Check your PBS dashboard status: Line Holder or Reserve?</li>
              <li>Lineholder: rank trips/patterns in layers — most-wanted in Layer 1, full pattern in a later layer.</li>
              <li>Reserve: build your off-day pattern in Layers 6–7 using the Reserve Calendar demand numbers; re-rank your top 1–2 days in upper layers.</li>
              <li>Never skip layers; check legality of the whole pattern before submitting.</li>
            </ol>
          </v-card-text>
        </v-card>
      </v-window-item>
    </v-window>

    <v-card variant="outlined" class="mt-8 pa-5 d-flex align-center ga-3 flex-wrap">
      <SourceTag :source="{ kind: 'loa', label: 'Implementation Timeline LOA', reference: 'App. A' }" />
      <SourceTag :source="{ kind: 'contract', label: 'AA/APFA Contract', reference: '§10, §12' }" />
      <span class="text-caption text-medium-emphasis">
        Structure and plain-language explanations mirror APFA's public Bidding education
        (apfa.org/bidding). Always defer to the CBA and APFA for official guidance.
      </span>
    </v-card>
  </v-container>
</template>
