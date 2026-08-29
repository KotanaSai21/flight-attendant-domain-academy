<script setup lang="ts">
defineProps<{ variant: 'airport' | 'cabin' | 'network' | 'aircraft' }>()
</script>

<template>
  <div class="scene-wrap">
    <!-- ============ AIRPORT SCENE ============ -->
    <svg v-if="variant === 'airport'" viewBox="0 0 800 380" class="scene" role="img" aria-label="Aircraft at the gate surrounded by support workgroups">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#dceefb" />
          <stop offset="1" stop-color="#f5f7fa" />
        </linearGradient>
      </defs>
      <rect width="800" height="380" fill="url(#sky)" rx="14" />
      <!-- terminal -->
      <rect x="20" y="90" width="180" height="150" rx="8" fill="#c8d6e5" />
      <rect x="20" y="80" width="180" height="14" rx="4" fill="#829ab1" />
      <g fill="#f0f4f8">
        <rect x="34" y="110" width="26" height="18" rx="3" /><rect x="70" y="110" width="26" height="18" rx="3" />
        <rect x="106" y="110" width="26" height="18" rx="3" /><rect x="142" y="110" width="26" height="18" rx="3" />
        <rect x="34" y="140" width="26" height="18" rx="3" /><rect x="70" y="140" width="26" height="18" rx="3" />
        <rect x="106" y="140" width="26" height="18" rx="3" /><rect x="142" y="140" width="26" height="18" rx="3" />
        <rect x="34" y="170" width="26" height="40" rx="3" /><rect x="106" y="170" width="26" height="40" rx="3" />
      </g>
      <text x="110" y="262" text-anchor="middle" class="lbl">TERMINAL</text>
      <!-- jet bridge -->
      <path d="M200 150 L300 150 L330 175 L300 200 L200 200 Z" fill="#9fb3c8" />
      <!-- tarmac -->
      <rect x="0" y="290" width="800" height="90" fill="#dbe4ee" />
      <line x1="0" y1="335" x2="800" y2="335" stroke="#bccc0d" stroke-width="4" stroke-dasharray="26 18" opacity="0.5" />
      <!-- aircraft -->
      <g class="plane">
        <path d="M340 210 q10 -34 60 -36 l250 0 q60 4 96 26 q-36 22 -96 26 l-250 0 q-50 -2 -60 -16 z" fill="#ffffff" stroke="#486581" stroke-width="3" />
        <path d="M470 174 l-34 -52 l30 0 l48 52 z" fill="#0061ab" />
        <path d="M430 226 l-30 34 l22 0 l30 -34 z" fill="#9fb3c8" />
        <path d="M540 226 l-30 34 l22 0 l30 -34 z" fill="#9fb3c8" />
        <g fill="#bcdcf5">
          <circle cx="380" cy="200" r="4" /><circle cx="404" cy="200" r="4" /><circle cx="428" cy="200" r="4" />
          <circle cx="452" cy="200" r="4" /><circle cx="476" cy="200" r="4" /><circle cx="500" cy="200" r="4" />
          <circle cx="524" cy="200" r="4" /><circle cx="548" cy="200" r="4" /><circle cx="572" cy="200" r="4" />
          <circle cx="596" cy="200" r="4" /><circle cx="620" cy="200" r="4" /><circle cx="644" cy="200" r="4" />
        </g>
        <!-- doors -->
        <rect x="352" y="186" width="10" height="26" rx="3" fill="#c01933" />
        <rect x="700" y="186" width="10" height="26" rx="3" fill="#c01933" />
        <!-- cockpit -->
        <path d="M700 190 q26 6 40 10 q-14 4 -40 10 z" fill="#102a43" />
      </g>
      <!-- jet bridge connects to front door -->
      <path d="M300 175 L348 199" stroke="#627d98" stroke-width="8" stroke-linecap="round" />
      <!-- fuel truck -->
      <rect x="470" y="300" width="70" height="30" rx="6" fill="#f0b429" />
      <rect x="530" y="288" width="26" height="20" rx="4" fill="#f0b429" />
      <circle cx="488" cy="334" r="8" fill="#334e68" /><circle cx="524" cy="334" r="8" fill="#334e68" />
      <text x="505" y="358" text-anchor="middle" class="lbl">GROUND STAFF</text>
      <!-- baggage cart -->
      <rect x="600" y="302" width="52" height="26" rx="5" fill="#627d98" />
      <circle cx="614" cy="332" r="7" fill="#334e68" /><circle cx="640" cy="332" r="7" fill="#334e68" />
      <text x="626" y="358" text-anchor="middle" class="lbl">BAGS · CATERING</text>
      <!-- gate agents at door -->
      <g class="bob">
        <circle cx="345" cy="262" r="9" fill="#c01933" />
        <rect x="337" y="272" width="16" height="24" rx="6" fill="#c01933" />
      </g>
      <text x="345" y="316" text-anchor="middle" class="lbl">GATE AGENTS</text>
      <!-- cabin crew at door -->
      <g class="bob2">
        <circle cx="380" cy="258" r="9" fill="#0061ab" />
        <rect x="372" y="268" width="16" height="24" rx="6" fill="#0061ab" />
      </g>
      <text x="384" y="312" text-anchor="middle" class="lbl" fill="#0061ab">CABIN CREW</text>
      <!-- flight deck marker -->
      <g class="bob">
        <circle cx="716" cy="160" r="9" fill="#243b53" />
        <rect x="708" y="170" width="16" height="22" rx="6" fill="#243b53" />
      </g>
      <text x="714" y="210" text-anchor="middle" class="lbl">FLIGHT DECK</text>
    </svg>

    <!-- ============ CABIN SCENE ============ -->
    <svg v-else-if="variant === 'cabin'" viewBox="0 0 800 380" class="scene" role="img" aria-label="Top view of an aircraft cabin with flight attendant positions">
      <rect width="800" height="380" fill="#f0f4f8" rx="14" />
      <!-- fuselage -->
      <path d="M120 190 q0 -95 120 -95 l400 0 q140 10 150 95 q-10 85 -150 95 l-400 0 q-120 0 -120 -95 z"
            fill="#ffffff" stroke="#486581" stroke-width="4" />
      <!-- galleys -->
      <rect x="140" y="130" width="46" height="46" rx="6" fill="#829ab1" />
      <rect x="140" y="204" width="46" height="46" rx="6" fill="#829ab1" />
      <rect x="612" y="130" width="46" height="46" rx="6" fill="#829ab1" />
      <rect x="612" y="204" width="46" height="46" rx="6" fill="#829ab1" />
      <text x="163" y="122" text-anchor="middle" class="lbl">GALLEY</text>
      <text x="635" y="122" text-anchor="middle" class="lbl">GALLEY</text>
      <!-- doors L/R -->
      <g fill="#c01933">
        <rect x="196" y="112" width="14" height="24" rx="4" /><rect x="196" y="244" width="14" height="24" rx="4" />
        <rect x="420" y="100" width="14" height="24" rx="4" /><rect x="420" y="256" width="14" height="24" rx="4" />
        <rect x="560" y="112" width="14" height="24" rx="4" /><rect x="560" y="244" width="14" height="24" rx="4" />
      </g>
      <g class="lbl" fill="#c01933">
        <text x="203" y="98" text-anchor="middle">L1</text><text x="203" y="290" text-anchor="middle">R1</text>
        <text x="427" y="88" text-anchor="middle">L2</text><text x="427" y="298" text-anchor="middle">R2</text>
        <text x="567" y="98" text-anchor="middle">L4</text><text x="567" y="290" text-anchor="middle">R4</text>
      </g>
      <!-- seat zones -->
      <g>
        <rect x="252" y="120" width="150" height="140" rx="8" fill="#d6ebff" stroke="#0061ab" stroke-dasharray="5 4" />
        <rect x="470" y="120" width="130" height="140" rx="8" fill="#ffe3e6" stroke="#c01933" stroke-dasharray="5 4" />
        <!-- seat dots -->
        <g fill="#829ab1">
          <template v-for="row in 4" :key="'f' + row">
            <rect :x="262 + (row - 1) * 36" y="132" width="20" height="16" rx="4" />
            <rect :x="262 + (row - 1) * 36" y="232" width="20" height="16" rx="4" />
          </template>
          <template v-for="row in 3" :key="'a' + row">
            <rect :x="480 + (row - 1) * 38" y="132" width="20" height="16" rx="4" />
            <rect :x="480 + (row - 1) * 38" y="232" width="20" height="16" rx="4" />
          </template>
        </g>
        <g fill="#9fb3c8">
          <template v-for="row in 4" :key="'fm' + row">
            <rect :x="262 + (row - 1) * 36" y="182" width="20" height="16" rx="4" />
          </template>
          <template v-for="row in 3" :key="'am' + row">
            <rect :x="480 + (row - 1) * 38" y="182" width="20" height="16" rx="4" />
          </template>
        </g>
      </g>
      <!-- position markers -->
      <g class="pos">
        <circle cx="216" cy="190" r="15" fill="#0061ab" />
        <text x="216" y="195" text-anchor="middle" fill="#fff" class="poslbl">1</text>
      </g>
      <g class="pos">
        <circle cx="330" cy="105" r="15" fill="#0078d2" />
        <text x="330" y="110" text-anchor="middle" fill="#fff" class="poslbl">2</text>
      </g>
      <g class="pos">
        <circle cx="460" cy="275" r="15" fill="#5a2d82" />
        <text x="460" y="280" text-anchor="middle" fill="#fff" class="poslbl">3</text>
      </g>
      <g class="pos">
        <circle cx="590" cy="190" r="15" fill="#c01933" />
        <text x="590" y="195" text-anchor="middle" fill="#fff" class="poslbl">4</text>
      </g>
      <!-- nose -->
      <path d="M120 190 q0 -95 120 -95 l-6 0 q-114 8 -114 95 q0 87 114 95 l6 0 q-120 0 -120 -95 z" fill="#e3ecf5" opacity="0.6" />
      <text x="400" y="366" text-anchor="middle" class="lbl">CABIN POSITIONS · 1 = LEAD AT L1 · ZONES SERVE THEIR OWN DOOR</text>
    </svg>

    <!-- ============ AIRCRAFT PARTS SCENE ============ -->
    <svg v-else-if="variant === 'aircraft'" viewBox="0 0 860 420" class="scene" role="img" aria-label="Clean side view of an airliner with labeled parts">
      <defs>
        <linearGradient id="skyA" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#d9edfb" />
          <stop offset="1" stop-color="#f6f9fc" />
        </linearGradient>
        <linearGradient id="bodyA" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#ffffff" />
          <stop offset="1" stop-color="#dfe9f3" />
        </linearGradient>
      </defs>
      <rect width="860" height="420" fill="url(#skyA)" rx="14" />

      <!-- clouds -->
      <g fill="#ffffff" opacity="0.85" class="drift">
        <ellipse cx="150" cy="66" rx="52" ry="16" />
        <ellipse cx="188" cy="56" rx="34" ry="13" />
        <ellipse cx="430" cy="44" rx="60" ry="15" />
        <ellipse cx="470" cy="36" rx="34" ry="11" />
        <ellipse cx="700" cy="70" rx="46" ry="14" />
      </g>

      <!-- ground shadow -->
      <ellipse cx="440" cy="374" rx="300" ry="13" fill="#003057" opacity="0.08" />

      <g class="float">
        <!-- vertical stabilizer (tail fin) -->
        <path d="M302 180 L254 76 L198 76 L238 180 Z" fill="#0061ab" />
        <path d="M302 180 L272 108 L290 108 L316 180 Z" fill="#c01933" opacity="0.9" />

        <!-- horizontal stabilizer -->
        <path d="M228 196 L146 216 L166 224 L242 208 Z" fill="#9fb3c8" />

        <!-- fuselage -->
        <path d="M700 176 L300 176 C252 177 208 194 170 212 L168 218 C206 236 258 246 312 246 L640 246 C692 245 732 230 754 210 C736 190 722 177 700 176 Z"
              fill="url(#bodyA)" stroke="#486581" stroke-width="3" />

        <!-- wing (near side, swept toward viewer) -->
        <path d="M470 242 L560 322 L602 330 L546 244 Z" fill="#b8c9da" stroke="#829ab1" stroke-width="2" />
        <!-- engine pylon + pod -->
        <path d="M528 266 L550 266 L558 292 L538 292 Z" fill="#829ab1" />
        <rect x="514" y="290" width="76" height="46" rx="22" fill="#d6e4f0" stroke="#627d98" stroke-width="2.5" />
        <ellipse cx="590" cy="313" rx="7" ry="21" fill="#334e68" />

        <!-- landing gear -->
        <line x1="676" y1="244" x2="676" y2="264" stroke="#486581" stroke-width="4" />
        <circle cx="676" cy="272" r="9" fill="#334e68" /><circle cx="676" cy="272" r="3.5" fill="#ffffff" />
        <line x1="521" y1="244" x2="521" y2="266" stroke="#486581" stroke-width="4" />
        <circle cx="509" cy="274" r="10" fill="#334e68" /><circle cx="509" cy="274" r="3.5" fill="#ffffff" />
        <circle cx="535" cy="274" r="10" fill="#334e68" /><circle cx="535" cy="274" r="3.5" fill="#ffffff" />

        <!-- cockpit windshield -->
        <path d="M704 184 L734 197 L726 206 L698 195 Z" fill="#102a43" />
        <path d="M686 182 L704 186 L699 196 L682 191 Z" fill="#102a43" />

        <!-- passenger windows -->
        <g fill="#627d98">
          <rect v-for="i in 14" :key="'w' + i" :x="318 + (i - 1) * 23" y="191" width="10" height="13" rx="4" />
        </g>

        <!-- galleys & lavatory hints -->
        <rect x="322" y="190" width="18" height="32" rx="3" fill="#c8d6e5" />
        <rect x="596" y="192" width="20" height="28" rx="3" fill="#c8d6e5" />

        <!-- doors -->
        <rect x="636" y="182" width="13" height="36" rx="5" fill="#ffffff" stroke="#c01933" stroke-width="2.5" />
        <rect x="306" y="182" width="13" height="36" rx="5" fill="#ffffff" stroke="#c01933" stroke-width="2.5" />
        <rect x="452" y="186" width="10" height="26" rx="4" fill="#ffffff" stroke="#c01933" stroke-width="2" />
        <rect x="478" y="186" width="10" height="26" rx="4" fill="#ffffff" stroke="#c01933" stroke-width="2" />
      </g>

      <!-- labels -->
      <g stroke="#c01933" stroke-width="1.6" opacity="0.65" fill="none">
        <path d="M170 66 L226 118" />
        <path d="M380 128 L380 172" />
        <path d="M466 134 L466 184" />
        <path d="M598 128 L600 188" />
        <path d="M700 124 L710 180" />
        <path d="M306 290 L320 224" />
        <path d="M420 292 L420 212" />
        <path d="M636 346 L568 328" />
        <path d="M704 262 L650 204" />
      </g>
      <g fill="#c01933">
        <circle cx="226" cy="118" r="3.5" /><circle cx="380" cy="172" r="3.5" />
        <circle cx="466" cy="184" r="3.5" /><circle cx="600" cy="188" r="3.5" />
        <circle cx="710" cy="180" r="3.5" /><circle cx="320" cy="224" r="3.5" />
        <circle cx="420" cy="212" r="3.5" /><circle cx="568" cy="328" r="3.5" />
        <circle cx="650" cy="204" r="3.5" />
      </g>
      <g class="plbl" fill="#c01933">
        <text x="150" y="58" text-anchor="middle">Tail</text>
        <text x="380" y="120" text-anchor="middle">Fuselage</text>
        <text x="466" y="126" text-anchor="middle">Overwing Exit</text>
        <text x="598" y="120" text-anchor="middle">Lavatory</text>
        <text x="706" y="116" text-anchor="middle">Cockpit (Flight Deck)</text>
        <text x="292" y="306" text-anchor="middle">Galley</text>
        <text x="420" y="308" text-anchor="middle">Cabin (Passenger Area)</text>
        <text x="648" y="362" text-anchor="middle">Wings</text>
        <text x="722" y="278" text-anchor="middle">Main Exit</text>
      </g>

      <text x="430" y="406" text-anchor="middle" class="lbl">COMMON PARTS OF AN AIRCRAFT · SIDE VIEW</text>
    </svg>

    <!-- ============ NETWORK / HUB SCENE ============ -->
    <svg v-else viewBox="0 0 800 400" class="scene" role="img" aria-label="Hub-and-spoke map of the eleven crew bases with co-terminal metro pairs">
      <defs>
        <linearGradient id="netbg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#e7f1fb" />
          <stop offset="1" stop-color="#f7fafc" />
        </linearGradient>
        <radialGradient id="hubglow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stop-color="#0061ab" stop-opacity="0.35" />
          <stop offset="1" stop-color="#0061ab" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="400" fill="url(#netbg)" rx="14" />

      <!-- stylized US landmass (smoother, editable city-frame) -->
      <path d="M62 96 L120 52 L180 40 L286 30 L400 26 L520 34 L612 52 L682 62 L702 84 L692 104 L712 132 L726 166 L700 200 L678 232 L664 268 L642 300 L600 326 L566 300 L520 292 L470 304 L430 288 L392 282 L348 296 L306 286 L268 276 L240 282 L200 272 L160 258 L118 234 L92 204 L74 172 L56 140 Z"
            fill="#ffffff" stroke="#b9cfe0" stroke-width="2.5" />

      <!-- subtle hub glow behind DFW -->
      <circle cx="352" cy="236" r="70" fill="url(#hubglow)" />

      <!-- co-terminal pair rings (no text; base dots below carry the codes) -->
      <g stroke="#c01933" stroke-width="2" stroke-dasharray="4 4">
        <circle cx="672" cy="120" r="30" class="spin" />
        <circle cx="446" cy="106" r="22" class="spin" />
        <circle cx="352" cy="232" r="30" class="spin" />
        <circle cx="612" cy="162" r="22" class="spin" />
      </g>

      <!-- hub-and-spoke demo: 3-day DFW loop (animated) -->
      <path class="route" d="M352 232 Q416 150 446 106" fill="none" stroke="#0061ab" stroke-width="3" />
      <path class="route" d="M446 106 Q562 128 578 204" fill="none" stroke="#0061ab" stroke-width="3" />
      <path class="route" d="M578 204 Q480 300 352 232" fill="none" stroke="#c01933" stroke-width="3" />

      <!-- base dots -->
      <g v-for="b in bases" :key="b.code" class="base">
        <circle :cx="b.x" :cy="b.y" r="8" fill="#0061ab" stroke="#ffffff" stroke-width="2.5" />
        <text :x="b.x" :y="b.y + (b.labelBelow ? 20 : -14)" text-anchor="middle" class="lbl" :fill="b.hub ? '#003057' : '#627d98'">{{ b.code }}</text>
      </g>

      <!-- legend -->
      <g class="lbl">
        <circle cx="52" cy="368" r="7" fill="#0061ab" stroke="#fff" stroke-width="2" />
        <text x="66" y="372">Crew base</text>
        <line x1="150" y1="364" x2="184" y2="364" stroke="#c01933" stroke-width="2" stroke-dasharray="4 4" />
        <text x="192" y="368">Co-terminal metro pair</text>
        <line x1="360" y1="364" x2="394" y2="364" stroke="#0061ab" stroke-width="3" />
        <text x="402" y="368">Example DFW 3-day loop</text>
      </g>
    </svg>

    <div v-if="$slots.default" class="text-caption text-center text-medium-emphasis mt-2">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      bases: [
        { code: 'SFO', x: 96, y: 158 },
        { code: 'LAX', x: 132, y: 226 },
        { code: 'PHX', x: 196, y: 240 },
        { code: 'DFW', x: 352, y: 232, hub: true },
        { code: 'ORD', x: 446, y: 106 },
        { code: 'MIA', x: 596, y: 300 },
        { code: 'CLT', x: 578, y: 204 },
        { code: 'PHL', x: 636, y: 146 },
        { code: 'DCA', x: 612, y: 162, labelBelow: true },
        { code: 'JFK', x: 672, y: 120 },
        { code: 'LGA', x: 662, y: 138, labelBelow: true },
      ],
    }
  },
}
</script>

<style scoped>
.scene-wrap {
  background: #fff;
  border: 1px solid #e3ebf3;
  border-radius: 14px;
  padding: 10px;
  box-shadow: 0 3px 14px rgba(0, 48, 87, 0.08);
}
.scene {
  width: 100%;
  height: auto;
  display: block;
}
.lbl {
  font-size: 11px;
  font-weight: 700;
  fill: #486581;
  letter-spacing: 0.04em;
}
.poslbl {
  font-size: 13px;
  font-weight: 800;
}
.route {
  stroke-dasharray: 8 7;
  animation: dashmove 1.6s linear infinite;
  opacity: 0.85;
}
@keyframes dashmove {
  to {
    stroke-dashoffset: -30;
  }
}
.spin {
  animation: spin 14s linear infinite;
  transform-origin: center;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.base circle {
  animation: pop 2.4s ease-in-out infinite alternate;
}
@keyframes pop {
  from { transform: scale(1); }
  to { transform: scale(1.18); }
}
.bob { animation: bob 2.6s ease-in-out infinite; }
.bob2 { animation: bob 2.6s ease-in-out 0.6s infinite; }
@keyframes bob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
.plane { animation: planeidle 3.2s ease-in-out infinite; }
@keyframes planeidle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}
.float { animation: planeidle 4s ease-in-out infinite; transform-origin: center; }
.drift { animation: driftmove 9s ease-in-out infinite alternate; }
@keyframes driftmove {
  from { transform: translateX(0); }
  to { transform: translateX(26px); }
}
.plbl {
  font-size: 13px;
  font-weight: 800;
}
</style>
