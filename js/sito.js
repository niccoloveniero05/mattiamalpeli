// Testi nelle tre lingue, scorrimento, rotella e modulo del sito di Mattia Malpeli (la scena 3D sta in scena.js).
(function(){
'use strict';
var html=document.documentElement;
var RID=matchMedia('(prefers-reduced-motion: reduce)').matches;
var PC=matchMedia('(hover:hover) and (pointer:fine)').matches;

/* ================= testi nelle tre lingue (l'italiano si legge dalla pagina) ================= */
var T={it:{},en:{
  cta_breve:'Confidential meeting',
  hero_etichetta:'Corporate Restructuring · Special Situations · Private Investments',
  h1:'<span class="riga"><span>When complexity</span></span><span class="riga"><span>calls for <em>more</em></span></span><span class="riga"><span><em>than advice.</em></span></span>',
  hero_sotto:'Corporate restructuring, complex corporate transactions and investments with proprietary capital.',
  cta:'Request a confidential meeting',
  dichiara:'Every company is a structure. When the pieces no longer hold, it takes someone who can assess it, <em>reorganise it</em> and, when it is the right call, <em>take it apart in order.</em>',
  esp_etichetta:'Experience',esp_n1:'corporate situations in the last 24 months',esp_n2:'countries: Italy and Spain',esp_n3:'standard solutions',
  esp_testo:'Situations differing in size, complexity and goal. Some aimed at turning the business around and carrying on; others at selling or winding down in an orderly way. Each time, the path was chosen on the facts.',
  ritratto:'Professional portrait here',chi_etichetta:'Profile',
  chi_titolo:'An independent professional, <em>inside the transaction.</em>',
  chi_p1:'I work on complex corporate situations: companies to reorganise, crises to manage, extraordinary transactions, investments to assess with proprietary capital.',
  chi_p2:'I don’t stop at an opinion. When needed I coordinate lawyers, accountants and corporate advisers and, when formally appointed, I take on corporate or management roles directly.',
  chi_p3:'I take on a limited number of selected mandates, with the confidentiality these situations require.',
  a1_titolo:'Putting the structure <em>back on its axis.</em>',
  a1_voci:'<li>Corporate restructuring and reorganisation</li><li>Assessment of recovery and going-concern options</li><li>Planning and coordination of operational measures</li><li>Reorganisation of corporate and management structures</li>',
  a2_titolo:'Managing the crisis. <em>Or exiting in order.</em>',
  a2_voci:'<li>Strategic management of corporate crises</li><li>Operational support in pre-insolvency phases</li><li>Assessment of divestment or final wind-down paths</li><li>Coordination of legal, accounting and corporate professionals</li>',
  a3_titolo:'Inside the transaction, <em>not beside it.</em>',
  a3_voci:'<li>Extraordinary corporate transactions</li><li>Corporate or management roles taken on directly, when appropriate and formally conferred</li><li>Identification and coordination of managers</li><li>Strategic oversight of multidisciplinary interventions</li>',
  a4_titolo:'Proprietary capital, <em>concrete decisions.</em>',
  a4_voci:'<li>Investments with proprietary capital</li><li>Acquisition of shareholdings</li><li>Purchase of companies, business units and individual assets</li><li>Direct financing, within the limits of applicable law</li><li>Opportunities with potential for recovery, growth or value creation</li>',
  a4_nota:'No predefined size threshold: each transaction is assessed on its complexity and its concrete opportunities.',
  met_etichetta:'Method',met_titolo:'How I <em>work.</em>',
  met_passi:'<li><b>01</b><div><h3>Confidential meeting</h3><p>A first conversation to understand the real situation: numbers, people, timing, constraints.</p></div></li><li><b>02</b><div><h3>Assessment</h3><p>An independent analysis of the possible paths, with no predefined templates.</p></div></li><li><b>03</b><div><h3>Decision</h3><p>Carry on, reorganise, sell or close: the choice is made on the facts, together with the owners.</p></div></li><li><b>04</b><div><h3>Intervention</h3><p>Coordination of the professionals involved and, where conferred, a direct role in the transaction.</p></div></li>',
  dig_etichetta:'Complementary specialisation',
  dig_lead:'Technical expertise in blockchain and self-custody of digital assets. A separate activity, independent from corporate advisory.',
  dig_voci:'<li>Hardware wallets: selection and technical setup</li><li>Blockchain: how the different networks work</li><li>Self-custody of your own digital assets</li><li>Operational security in managing the tools</li><li>Training and in-depth sessions on blockchain infrastructure</li>',
  dig_avviso:'Training and technical support only. It does not include investment services, financial advice, third-party custody or portfolio management.',
  dove_etichetta:'Where I operate',dove_titolo:'Italy <em>and Spain.</em>',dove_it:'Main activity, nationwide.',dove_es:'Málaga and Marbella.',
  con_etichetta:'Confidential contact',con_titolo:'Request a <em>confidential meeting.</em>',
  con_testo:'Every request is read personally. A few lines are enough, with no sensitive data: if there is room for an intervention, you will be contacted for a first meeting.',
  f_nome:'Full name',f_soc:'Company',f_tel:'Phone',f_tipo:'Type of transaction',
  f_opzioni:'<option>Restructuring or turnaround</option><option>Crisis or business exit</option><option>Extraordinary transaction or governance</option><option>Investment or acquisition</option><option>Digital assets and blockchain</option><option>Other</option>',
  f_desc:'Brief description (no sensitive data)',f_privacy:'I have read the <a href="privacy.html" target="_blank" rel="noopener">privacy notice</a>.',
  f_invia:'Send request',f_nota:'Submitting a request does not constitute an engagement.',
  piede_luoghi:'Italy · Spain (Málaga, Marbella)',piede_contatto:'Contact',
  _inviato:'Thank you, your request has been sent. You will be contacted shortly.',_errore:'The form is not available right now: please call one of the numbers above.',
  _manca:'Please fill in name and email and accept the privacy notice.',
  _titolo:'Mattia Malpeli · Corporate Restructuring, Special Situations & Private Investments',
  _nomi:{inizio:'Home',struttura:'Structure',esperienza:'Experience',chi:'Profile',a1:'01 · Restructuring',a2:'02 · Crisis & Exit',a3:'03 · Special Situations',a4:'04 · Private Investments',metodo:'Method',digital:'Digital Assets',dove:'Italy · Spain',contatto:'Contact'}
},es:{
  cta_breve:'Reunión confidencial',
  hero_etichetta:'Corporate Restructuring · Special Situations · Private Investments',
  h1:'<span class="riga"><span>Cuando la complejidad</span></span><span class="riga"><span>exige <em>algo más</em></span></span><span class="riga"><span><em>que una consultoría.</em></span></span>',
  hero_sotto:'Reestructuraciones empresariales, operaciones societarias complejas e inversiones con capital propio.',
  cta:'Solicita una reunión confidencial',
  dichiara:'Toda empresa es una estructura. Cuando las piezas ya no se sostienen, hace falta alguien capaz de evaluarla, <em>reorganizarla</em> y, si es la decisión correcta, <em>desmontarla con orden.</em>',
  esp_etichetta:'Experiencia',esp_n1:'situaciones empresariales en los últimos 24 meses',esp_n2:'países: Italia y España',esp_n3:'soluciones estándar',
  esp_testo:'Situaciones distintas por tamaño, complejidad y objetivo. En algunos casos se trataba de sanear y continuar; en otros, de vender o cerrar de forma ordenada. Cada vez, el camino se eligió sobre los hechos.',
  ritratto:'Aquí el retrato profesional',chi_etichetta:'Perfil',
  chi_titolo:'Un profesional independiente, <em>dentro de la operación.</em>',
  chi_p1:'Me ocupo de situaciones societarias complejas: empresas que reorganizar, crisis que gestionar, operaciones extraordinarias, inversiones que evaluar con capital propio.',
  chi_p2:'No me quedo en la opinión. Cuando hace falta coordino a abogados, asesores contables y societarios y, cuando el encargo se confiere formalmente, asumo directamente cargos societarios o de gestión.',
  chi_p3:'Acepto un número limitado de encargos, seleccionados, con la confidencialidad que estas situaciones requieren.',
  a1_titolo:'Devolver la estructura <em>a su eje.</em>',
  a1_voci:'<li>Reestructuración y reorganización empresarial</li><li>Evaluación de las posibilidades de saneamiento y continuidad</li><li>Planificación y coordinación de las actuaciones operativas</li><li>Reorganización de las estructuras societarias y directivas</li>',
  a2_titolo:'Gestionar la crisis. <em>O salir con orden.</em>',
  a2_voci:'<li>Gestión estratégica de situaciones de crisis empresarial</li><li>Apoyo operativo en las fases preconcursales</li><li>Evaluación de procesos de desinversión o de cese definitivo</li><li>Coordinación de profesionales jurídicos, contables y societarios</li>',
  a3_titolo:'Dentro de la operación, <em>no al margen.</em>',
  a3_voci:'<li>Operaciones societarias extraordinarias</li><li>Cargos societarios o directivos asumidos directamente, cuando proceda y se confieran formalmente</li><li>Selección y coordinación de perfiles directivos</li><li>Supervisión estratégica de intervenciones multidisciplinares</li>',
  a4_titolo:'Capital propio, <em>decisiones concretas.</em>',
  a4_voci:'<li>Inversiones con capital propio</li><li>Adquisición de participaciones societarias</li><li>Compra de empresas, ramas de actividad y activos individuales</li><li>Financiación directa, dentro de los límites de la normativa aplicable</li><li>Oportunidades con potencial de recuperación, desarrollo o revalorización</li>',
  a4_nota:'Sin umbral de tamaño predefinido: cada operación se valora por su complejidad y por las oportunidades concretas.',
  met_etichetta:'Método',met_titolo:'Cómo <em>intervengo.</em>',
  met_passi:'<li><b>01</b><div><h3>Reunión confidencial</h3><p>Una primera conversación para entender la situación real: cifras, personas, plazos, limitaciones.</p></div></li><li><b>02</b><div><h3>Evaluación</h3><p>Un análisis independiente de los caminos posibles, sin esquemas predefinidos.</p></div></li><li><b>03</b><div><h3>Decisión</h3><p>Continuar, reorganizar, vender o cerrar: se decide sobre los hechos, junto con la propiedad.</p></div></li><li><b>04</b><div><h3>Intervención</h3><p>Coordinación de los profesionales implicados y, si se confiere, un papel directo en la operación.</p></div></li>',
  dig_etichetta:'Especialización complementaria',
  dig_lead:'Competencias técnicas en blockchain y autocustodia de activos digitales. Una actividad autónoma, separada de la consultoría societaria.',
  dig_voci:'<li>Hardware wallets: elección y configuración técnica</li><li>Blockchain: cómo funcionan las distintas redes</li><li>Self-custody: custodiar uno mismo sus activos digitales</li><li>Seguridad operativa en la gestión de las herramientas</li><li>Formación y profundización en infraestructuras blockchain</li>',
  dig_avviso:'Formación y soporte técnico. No incluye servicios de inversión, asesoramiento financiero, custodia por cuenta de terceros ni gestión de carteras.',
  dove_etichetta:'Áreas operativas',dove_titolo:'Italia <em>y España.</em>',dove_it:'Actividad principal, en todo el territorio nacional.',dove_es:'Málaga y Marbella.',
  con_etichetta:'Contacto confidencial',con_titolo:'Solicita una <em>reunión confidencial.</em>',
  con_testo:'Cada solicitud se lee personalmente. Bastan unas líneas, sin datos sensibles: si hay margen para intervenir, recibirás respuesta para una primera reunión.',
  f_nome:'Nombre y apellidos',f_soc:'Empresa',f_tel:'Teléfono',f_tipo:'Tipo de operación',
  f_opzioni:'<option>Reestructuración o turnaround</option><option>Crisis o salida de la actividad</option><option>Operación extraordinaria o gobierno corporativo</option><option>Inversión o adquisición</option><option>Digital assets y blockchain</option><option>Otro</option>',
  f_desc:'Descripción breve (sin datos sensibles)',f_privacy:'He leído la <a href="privacy.html" target="_blank" rel="noopener">política de privacidad</a>.',
  f_invia:'Enviar solicitud',f_nota:'El envío de la solicitud no supone la aceptación de un encargo.',
  piede_luoghi:'Italia · España (Málaga, Marbella)',piede_contatto:'Contacto',
  _inviato:'Gracias, tu solicitud ha sido enviada. Te contactaremos en breve.',_errore:'El formulario no está disponible ahora: llama a uno de los números de arriba.',
  _manca:'Rellena nombre y email y acepta la política de privacidad.',
  _titolo:'Mattia Malpeli · Corporate Restructuring, Special Situations & Private Investments',
  _nomi:{inizio:'Inicio',struttura:'Estructura',esperienza:'Experiencia',chi:'Perfil',a1:'01 · Restructuring',a2:'02 · Crisis & Exit',a3:'03 · Special Situations',a4:'04 · Private Investments',metodo:'Método',digital:'Digital Assets',dove:'Italia · España',contatto:'Contacto'}
}};
/* testi della revisione del 29/10 (sezioni chiare, foto, tipologie, investimenti, modulo qualificato) */
Object.assign(T.en,{
  cta_breve:'Request a confidential meeting',paese_it:'Italy',paese_es:'Spain',rec_tel_it:'Phone, Italy',rec_tel_es:'Phone, Spain',rec_ind:'Address',rec_citta:'29009 Málaga, Spain',
  dichiara:'Every company is a structure. When its balance fails, it takes someone who can assess it, <em>reorganise it</em> and, when it is the right decision, <em>manage its divestment through a structured process.</em>',
  chi_p2:'I do not stop at technical advice. When formally appointed, I take on management and corporate roles directly; when the transaction requires it, I identify and coordinate specialised managers and professionals.',
  chi_tratti:'<li><b>Operational involvement</b><span>Inside the company, alongside the owners, in the phases where decisions are made.</span></li><li><b>Decision-making capability</b><span>Independent analysis that leads to a decision, not to a list of hypotheses.</span></li><li><b>Personalised approach</b><span>Each transaction follows its own path, with no predefined templates.</span></li>',
  esp_titolo:'Concrete experience, <em>across different situations.</em>',
  esp_testo:'Situations differing in size, complexity and goal. Some aimed at turning the business around and carrying on; others at a sale or an orderly wind-down. Each path was defined on an analysis of the facts.',
  tip_titolo:'Types of intervention',
  tip_testo:'No names and no confidential information. The examples describe the type of situation addressed; they do not promise results.',
  tip_voci:'<li><b>01</b><h4>Reorganisation and continuity</h4><p>Companies to be brought back into balance in order to carry on.</p></li><li><b>02</b><h4>Crisis and pre-insolvency</h4><p>Crisis management and operational support in the most delicate phases.</p></li><li><b>03</b><h4>Divestment or wind-down</h4><p>Structured processes to sell or close down a business.</p></li><li><b>04</b><h4>Extraordinary transactions</h4><p>Corporate reorganisations and transactions outside ordinary management.</p></li><li><b>05</b><h4>Direct appointments</h4><p>Corporate or management roles taken on personally, under a formal mandate.</p></li><li><b>06</b><h4>Acquisitions with proprietary capital</h4><p>Shareholdings, companies, business units or individual assets.</p></li>',
  a2_titolo:'Crisis management <em>and structured divestment.</em>',
  a2_voci:'<li>Strategic management of corporate crises</li><li>Operational support in pre-insolvency phases</li><li>Management of structured divestment or corporate wind-down processes</li><li>Coordination of legal, accounting and corporate professionals</li>',
  a3_titolo:'A direct role <em>in the transaction.</em>',
  a3_voci:'<li>Extraordinary corporate transactions</li><li>Direct appointment to corporate or management roles, when formally conferred</li><li>Identification and coordination of specialised managers and professionals</li><li>Strategic oversight of multidisciplinary interventions</li>',
  a4_titolo:'Investments <em>with proprietary capital.</em>',
  a4_lead:'Alongside advisory work and operational management, I assess direct investments with my own capital.',
  a4_voci:'<li>Acquisition of shareholdings</li><li>Purchase of companies or business units</li><li>Acquisition of assets</li><li>Assessment of financing interventions, in compliance with applicable law</li>',
  a4_nota:'A selective, non-automatic activity: every transaction is subject to a specific analysis. I do not operate as an investment fund or as a financial intermediary.',
  met_passi:'<li><b>01</b><div><h3>Confidential meeting</h3><p>A first conversation to understand the real situation: numbers, people, timing, constraints.</p></div></li><li><b>02</b><div><h3>Assessment</h3><p>An independent analysis of the possible paths, with no predefined templates.</p></div></li><li><b>03</b><div><h3>Decision</h3><p>Carry on, reorganise, sell or wind down: the choice is made on the facts, together with the owners.</p></div></li><li><b>04</b><div><h3>Intervention</h3><p>Coordination of the professionals involved and, where conferred, a direct role in the transaction.</p></div></li>',
  dig_lead:'Technical and training expertise in blockchain, hardware wallets, self-custody and digital infrastructure. A distinct activity, separate from corporate advisory.',
  dig_voci:'<li><b>01</b><span>Hardware wallets</span><em>selection and technical setup</em></li><li><b>02</b><span>Blockchain networks</span><em>architecture and operation</em></li><li><b>03</b><span>Self-custody</span><em>direct custody of your own digital assets</em></li><li><b>04</b><span>Operational security</span><em>procedures for managing the tools</em></li><li><b>05</b><span>Training</span><em>digital and blockchain infrastructure</em></li>',
  dig_avviso:'Strictly technical and training activity. It does not include trading, portfolio management, third-party custody or regulated financial advice.',
  con_testo:'I take on a limited number of mandates and every request is read personally. A few lines are enough, with no confidential data at this stage: if there is room for an intervention, you will be contacted for a first meeting.',
  f_nome:'Full name *',f_soc:'Company or organisation',f_ruolo:'Role *',
  f_ruolo_opz:'<option value="" selected disabled>Select</option><option>Entrepreneur</option><option>Shareholder</option><option>Investor</option><option>Professional</option>',
  f_tipo:'Type of request',
  f_opzioni:'<option>Restructuring or turnaround</option><option>Crisis management</option><option>Divestment or wind-down</option><option>Extraordinary transaction or governance</option><option>Investment or acquisition</option><option>Digital assets and blockchain</option><option>Other</option>',
  f_tel:'Phone *',f_desc:'Brief description of the situation (no confidential data)',f_invia:'Request a confidential meeting',
  _manca:'Please fill in name, role, email and phone, and accept the privacy notice.'
});
Object.assign(T.es,{
  cta_breve:'Solicita una reunión confidencial',paese_it:'Italia',paese_es:'España',rec_tel_it:'Teléfono, Italia',rec_tel_es:'Teléfono, España',rec_ind:'Dirección',rec_citta:'29009 Málaga, España',
  dichiara:'Toda empresa es una estructura. Cuando su equilibrio falla, hace falta alguien capaz de evaluarla, <em>reorganizarla</em> y, si es la decisión correcta, <em>gestionar su desinversión mediante un proceso estructurado.</em>',
  chi_p2:'No me limito al asesoramiento técnico. Cuando el encargo se confiere formalmente, asumo directamente cargos de gestión y societarios; cuando la operación lo requiere, selecciono y coordino directivos y profesionales especializados.',
  chi_tratti:'<li><b>Implicación operativa</b><span>Dentro de la empresa, junto a la propiedad, en las fases en que se decide.</span></li><li><b>Capacidad de decisión</b><span>Análisis independientes que llevan a una decisión, no a una lista de hipótesis.</span></li><li><b>Enfoque personalizado</b><span>Cada operación sigue su propio camino, sin esquemas predefinidos.</span></li>',
  esp_titolo:'Experiencia concreta, <em>en situaciones distintas.</em>',
  esp_testo:'Situaciones distintas por tamaño, complejidad y objetivo. En algunos casos se trataba de sanear y continuar la actividad; en otros, de vender o de llevar a cabo un cese ordenado. Cada camino se definió a partir del análisis de los hechos.',
  tip_titolo:'Tipologías de intervención',
  tip_testo:'Sin nombres ni información confidencial. Los ejemplos describen el tipo de situación abordada; no prometen resultados.',
  tip_voci:'<li><b>01</b><h4>Reorganización y continuidad</h4><p>Empresas que devolver al equilibrio para continuar la actividad.</p></li><li><b>02</b><h4>Crisis y fase preconcursal</h4><p>Gestión de la crisis y apoyo operativo en las fases más delicadas.</p></li><li><b>03</b><h4>Desinversión o cese</h4><p>Procesos estructurados de venta o de cierre de la actividad.</p></li><li><b>04</b><h4>Operaciones extraordinarias</h4><p>Reorganizaciones societarias y operaciones fuera de la gestión ordinaria.</p></li><li><b>05</b><h4>Encargos directos</h4><p>Cargos societarios o de gestión asumidos personalmente, con encargo formal.</p></li><li><b>06</b><h4>Adquisiciones con capital propio</h4><p>Participaciones, empresas, ramas de actividad o activos individuales.</p></li>',
  a2_titolo:'Gestión de la crisis <em>y desinversión estructurada.</em>',
  a2_voci:'<li>Gestión estratégica de situaciones de crisis empresarial</li><li>Apoyo operativo en las fases preconcursales</li><li>Gestión de procesos estructurados de desinversión o de cese empresarial</li><li>Coordinación de profesionales jurídicos, contables y societarios</li>',
  a3_titolo:'Un papel directo <em>en la operación.</em>',
  a3_voci:'<li>Operaciones societarias extraordinarias</li><li>Asunción directa de cargos societarios o de gestión, cuando se confieren formalmente</li><li>Selección y coordinación de directivos y profesionales especializados</li><li>Supervisión estratégica de intervenciones multidisciplinares</li>',
  a4_titolo:'Inversiones <em>con capital propio.</em>',
  a4_lead:'Además de la consultoría y la gestión operativa, valoro inversiones directas con capital propio.',
  a4_voci:'<li>Adquisición de participaciones societarias</li><li>Compra de empresas o ramas de actividad</li><li>Adquisición de activos</li><li>Valoración de intervenciones de financiación, conforme a la normativa aplicable</li>',
  a4_nota:'Una actividad selectiva y no automática: cada operación está sujeta a un análisis específico. No actúo como fondo de inversión ni como intermediario financiero.',
  met_passi:'<li><b>01</b><div><h3>Reunión confidencial</h3><p>Una primera conversación para entender la situación real: cifras, personas, plazos, limitaciones.</p></div></li><li><b>02</b><div><h3>Evaluación</h3><p>Un análisis independiente de los caminos posibles, sin esquemas predefinidos.</p></div></li><li><b>03</b><div><h3>Decisión</h3><p>Continuar, reorganizar, vender o cesar: se decide sobre los hechos, junto con la propiedad.</p></div></li><li><b>04</b><div><h3>Intervención</h3><p>Coordinación de los profesionales implicados y, si se confiere, un papel directo en la operación.</p></div></li>',
  dig_lead:'Competencias técnicas y formativas en blockchain, hardware wallets, autocustodia e infraestructuras digitales. Una actividad distinta y separada de la consultoría societaria.',
  dig_voci:'<li><b>01</b><span>Hardware wallets</span><em>elección y configuración técnica</em></li><li><b>02</b><span>Redes blockchain</span><em>arquitectura y funcionamiento</em></li><li><b>03</b><span>Autocustodia</span><em>custodia directa de los propios activos digitales</em></li><li><b>04</b><span>Seguridad operativa</span><em>procedimientos en la gestión de las herramientas</em></li><li><b>05</b><span>Formación</span><em>infraestructuras digitales y blockchain</em></li>',
  dig_avviso:'Actividad exclusivamente técnica y formativa. No incluye trading, gestión de carteras, custodia por cuenta de terceros ni asesoramiento financiero regulado.',
  con_testo:'Acepto un número limitado de encargos y cada solicitud se lee personalmente. Bastan unas líneas, sin datos confidenciales en esta fase: si hay margen para intervenir, recibirás respuesta para una primera reunión.',
  f_nome:'Nombre y apellidos *',f_soc:'Empresa u organización',f_ruolo:'Función *',
  f_ruolo_opz:'<option value="" selected disabled>Selecciona</option><option>Empresario</option><option>Socio</option><option>Inversor</option><option>Profesional</option>',
  f_tipo:'Tipo de solicitud',
  f_opzioni:'<option>Reestructuración o turnaround</option><option>Gestión de la crisis</option><option>Desinversión o cese</option><option>Operación extraordinaria o gobierno corporativo</option><option>Inversión o adquisición</option><option>Digital assets y blockchain</option><option>Otro</option>',
  f_tel:'Teléfono *',f_desc:'Descripción breve de la situación (sin datos confidenciales)',f_invia:'Solicita una reunión confidencial',
  _manca:'Rellena nombre, función, email y teléfono y acepta la política de privacidad.'
});
/* commercial risk intelligence (31/10) */
Object.assign(T.en,{
  ris_sotto:'Experience in business analysis meets technological innovation.',
  ris_lead:'Commercial risk analysis and early identification of corporate anomalies.',
  ris_p1:'Over the course of my professional experience I have developed a particular ability to identify risk signals and anomalies that may point to fraudulent behaviour in commercial relationships between companies.',
  ris_p2:'By interpreting corporate, economic, tax and operational parameters together, I can recognise situations that deserve closer examination before a commercial relationship begins or supplies are granted on deferred payment terms.',
  ris_p3:'This expertise stems from direct experience in analysing and managing complex corporate situations.',
  ris_prog_titolo:'Technology project in development',
  ris_prog_testo:'I am working on the design of a technological system intended to gradually automate part of this analysis process. The future goal is to translate my assessment methodology into a digital tool able to identify anomaly indicators, highlight inconsistencies and support companies in their commercial decisions.',
  ris_prog_nota:'The project is in development: it is not an operational platform and it is not commercially available. Any future offering of automated services will be defined after the necessary technical and regulatory checks.',
  ris_avviso:'The analysis flags situations that deserve closer examination: it does not establish fraud and does not guarantee the reliability of counterparties. This is not a private investigation, commercial information or rating activity.'
});
T.en._nomi.rischio='Risk Intelligence';
Object.assign(T.es,{
  ris_sotto:'La experiencia en el análisis empresarial se une a la innovación tecnológica.',
  ris_lead:'Análisis del riesgo comercial e identificación preventiva de anomalías societarias.',
  ris_p1:'A lo largo de mi experiencia profesional he desarrollado una especial capacidad para identificar señales de riesgo y anomalías que pueden apuntar a posibles conductas fraudulentas en las relaciones comerciales entre empresas.',
  ris_p2:'Mediante la interpretación combinada de parámetros societarios, económicos, fiscales y operativos, puedo reconocer situaciones que merecen un examen más profundo antes de iniciar relaciones comerciales o de conceder suministros con pago aplazado.',
  ris_p3:'Esta competencia nace de la experiencia directa en el análisis y la gestión de situaciones empresariales complejas.',
  ris_prog_titolo:'Proyecto tecnológico en desarrollo',
  ris_prog_testo:'Estoy trabajando en el diseño de un sistema tecnológico destinado a automatizar progresivamente parte de este proceso de análisis. El objetivo futuro es traducir mi metodología de evaluación en una herramienta digital capaz de identificar indicadores de anomalía, poner de relieve incoherencias y apoyar a las empresas en sus decisiones comerciales.',
  ris_prog_nota:'El proyecto está en fase de desarrollo: no es una plataforma operativa ni está disponible comercialmente. La eventual oferta futura de servicios automatizados se definirá tras las necesarias verificaciones técnicas y normativas.',
  ris_avviso:'El análisis señala las situaciones que conviene examinar: no acredita fraudes ni garantiza la fiabilidad de las contrapartes. No se trata de una actividad de investigación privada, de información comercial ni de rating.'
});
T.es._nomi.rischio='Risk Intelligence';
T.it._inviato='Grazie, la richiesta è stata inviata. Verrai ricontattato a breve.';
T.it._errore='Il modulo al momento non è disponibile: chiama uno dei numeri qui sopra.';
T.it._manca='Inserisci nome, ruolo, email e telefono e accetta l’informativa sulla privacy.';
T.it._titolo=document.title;
T.it._nomi={inizio:'Inizio',struttura:'Struttura',esperienza:'Esperienza',chi:'Chi sono',a1:'01 · Restructuring',a2:'02 · Crisis & Exit',a3:'03 · Special Situations',a4:'04 · Private Investments',metodo:'Metodo',rischio:'Risk Intelligence',digital:'Digital Assets',dove:'Italia · España',contatto:'Contatto'};
var nodi=document.querySelectorAll('[data-t]');
for(var i=0;i<nodi.length;i++)T.it[nodi[i].dataset.t]=nodi[i].innerHTML;
var lingua='it';

/* parole della frase che si accende */
var parole=[],frase=document.querySelector('.dichiara p.grande');
function dividi(){
  var tw=document.createTreeWalker(frase,NodeFilter.SHOW_TEXT),testi=[],n;
  while((n=tw.nextNode()))testi.push(n);
  testi.forEach(function(t){
    var f=document.createDocumentFragment();
    t.nodeValue.split(/(\s+)/).forEach(function(p){
      if(!p)return;
      if(/^\s+$/.test(p)){f.appendChild(document.createTextNode(p));return}
      var s=document.createElement('span');s.className='w';s.textContent=p;f.appendChild(s)});
    t.parentNode.replaceChild(f,t)});
  parole=frase.querySelectorAll('.w');
}

function scegli(l){
  if(!T[l])l='it';lingua=l;
  for(var i=0;i<nodi.length;i++){var k=nodi[i].dataset.t;if(T[l][k]!=null)nodi[i].innerHTML=T[l][k]}
  html.lang=l;document.title=T[l]._titolo;
  document.querySelectorAll('.lingue button').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.l===l?'true':'false')});
  dividi();misura();scorri();
  var e=document.getElementById('esito');if(e.classList.contains('si'))e.textContent=T[l][e.dataset.k||'_inviato'];
  try{localStorage.setItem('mm-lingua',l)}catch(_){}
}
document.querySelectorAll('.lingue button').forEach(function(b){b.addEventListener('click',function(){scegli(b.dataset.l)})});

/* ================= scorrimento: stato della scena, parole, sezione attuale ================= */
var sezioni=[].slice.call(document.querySelectorAll('[data-s]'));
var punti=[],tScena=1,doveSei=document.getElementById('dove-sei'),testata=document.querySelector('.testata');
function topDi(el){return el.getBoundingClientRect().top+scrollY}
function misura(){
  var vh=innerHeight,tel=innerWidth<820;punti=[];
  sezioni.forEach(function(s){
    var st=s.dataset.s.split(',').map(Number),top=topDi(s),h=s.offsetHeight;
    var a=top-(tel?.62:.38)*vh,b=top+h-(tel?.9:.78)*vh;if(b<a+40)b=a+40;
    punti.push([a,st[0]]);punti.push([b,st[st.length-1]]);
  });
}
function tDa(y){
  if(!punti.length)return 1;
  if(y<=punti[0][0])return punti[0][1];
  for(var k=1;k<punti.length;k++)if(y<punti[k][0]){var p0=punti[k-1],p1=punti[k];return p0[1]+(p1[1]-p0[1])*(y-p0[0])/(p1[0]-p0[0])}
  return punti[punti.length-1][1];
}
function clamp(x){return x<0?0:x>1?1:x}
var ultimaEtichetta='';
function scorri(){
  var y=scrollY,vh=innerHeight;
  tScena=tDa(y);
  if(window.mmScena)window.mmScena.vai(tScena);
  if(!RID&&parole.length){
    var r=frase.getBoundingClientRect(),p=clamp((vh*.84-r.top)/(r.height+vh*.42)),n=parole.length,acc=p*(n+3);
    for(var i=0;i<n;i++){var o=.16+.84*clamp(acc-i);parole[i].style.opacity=o.toFixed(3)}
  }
  testata.classList.toggle('scorsa',y>innerHeight*.6);
  var att=sezioni[0];
  for(var j=0;j<sezioni.length;j++)if(topDi(sezioni[j])<=y+vh*.45)att=sezioni[j];
  var nomi=T[lingua]._nomi,k=att.dataset.nome,idx=sezioni.indexOf(att)+1;
  var testo='<b>'+String(idx).padStart(2,'0')+'</b> / '+String(sezioni.length).padStart(2,'0')+' &nbsp; '+nomi[k];
  if(testo!==ultimaEtichetta){doveSei.innerHTML=testo;ultimaEtichetta=testo}
}
addEventListener('scroll',scorri,{passive:true});
var largh=innerWidth,tr;
addEventListener('resize',function(){clearTimeout(tr);tr=setTimeout(function(){
  if(Math.abs(innerWidth-largh)<2&&innerWidth<820){scorri();return} // telefono: la barra dell'indirizzo cambia l'altezza, non rimisurare tutto
  largh=innerWidth;misura();scorri()},150)});

/* ================= rotella del mouse «contata» (come veniellostudio.it) ================= */
var lenis=null;
if(window.Lenis&&PC&&!RID){
  var PASSO=110,RIGA=100/3,ultA=0,ultT=-1e9;
  var conta=function(d){var e=d.event;if(!e||e.type!=='wheel')return;
    if(Math.abs(d.deltaX)>Math.abs(d.deltaY))return false;
    var a=Math.abs(e.deltaY)*(e.deltaMode===1?RIGA:e.deltaMode===2?innerHeight:1),t=e.timeStamp,
      uguale=Math.abs(a-ultA)<.01&&t-ultT<400,q=a/RIGA;ultA=a;ultT=t;
    if(e.deltaMode||(a>=50&&(uguale||Math.abs(q-Math.round(q))<.003)))d.deltaY=(e.deltaY<0?-1:1)*Math.min(a,PASSO)};
  lenis=new Lenis({lerp:.1,smoothWheel:true,syncTouch:false,virtualScroll:conta});
  (function raf(t){lenis.raf(t);requestAnimationFrame(raf)})(performance.now());
}

/* link interni: scorrimento morbido fatto in JavaScript */
document.addEventListener('click',function(e){
  var a=e.target.closest('a[href^="#"]');if(!a)return;
  var id=a.getAttribute('href');if(id.length<2)return;
  var el=document.querySelector(id);if(!el)return;
  e.preventDefault();
  var off=innerWidth<820?0:-10;
  if(lenis)lenis.scrollTo(el,{offset:off,duration:1.6});
  else window.scrollTo({top:topDi(el)+off,behavior:RID?'auto':'smooth'});
});

/* ================= modulo ================= */
/* invio con Web3Forms: la chiave pubblica porta la richiesta all'email di Mattia senza scriverla nella pagina.
   Finché la chiave è vuota il modulo invita a telefonare. */
var CHIAVE_MODULO='';
document.getElementById('modulo').addEventListener('submit',function(e){
  e.preventDefault();var f=e.target,esito=document.getElementById('esito');
  if(f.sito.value)return; // campo trappola per i robot
  var ok=f.nome.value.trim()&&f.ruolo.value&&/\S+@\S+\.\S+/.test(f.email.value)&&f.telefono.value.replace(/\D/g,'').length>=6&&f.privacy.checked;
  function mostra(k){esito.dataset.k=k;esito.textContent=T[lingua][k];esito.classList.add('si')}
  if(!ok)return mostra('_manca');
  if(!CHIAVE_MODULO)return mostra('_errore');
  var dati={access_key:CHIAVE_MODULO,subject:'Nuova richiesta dal sito mattiamalpeli.com',from_name:'mattiamalpeli.com'};
  new FormData(f).forEach(function(v,k){if(k!=='sito')dati[k]=v});
  fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(dati)})
    .then(function(r){return r.json()}).then(function(r){if(r.success){f.reset();mostra('_inviato')}else mostra('_errore')})
    .catch(function(){mostra('_errore')});
});

/* ================= avvio ================= */
var l0='it';try{var q=new URLSearchParams(location.search).get('lang'),s=localStorage.getItem('mm-lingua');l0=q||s||'it'}catch(_){}
scegli(l0);
requestAnimationFrame(function(){html.classList.add('pronto')});
addEventListener('load',function(){misura();scorri()});

/* la scena 3D si carica a parte: se non parte, la pagina resta leggibile sullo sfondo */
import(new URL('js/scena.js',document.baseURI).href).then(function(m){m.avvia(document.getElementById('scena'),{ridotto:RID,t:tScena})}).catch(function(){html.classList.add('no3d')});
})();
