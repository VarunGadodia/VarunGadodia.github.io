/* Shared render functions — used by index.html */
(function(){
  const nav = document.getElementById('nav');
  if(nav) window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 60));
  window.openMob = function(){ const m=document.getElementById('mobNav'); if(m) m.classList.add('open'); };
  window.closeMob = function(){ const m=document.getElementById('mobNav'); if(m) m.classList.remove('open'); };

  const io = new IntersectionObserver(e => e.forEach(x => { if(x.isIntersecting) x.target.classList.add('in'); }), {threshold:.08, rootMargin:'0px 0px -40px 0px'});

  window.toggleExp = function(item){
    const o = item.classList.contains('open');
    document.querySelectorAll('.exp-item.open').forEach(i => { i.classList.remove('open'); i.querySelector('.exp-body').style.maxHeight='0'; });
    if(!o){ item.classList.add('open'); const b=item.querySelector('.exp-body'); b.style.maxHeight=b.scrollHeight+'px'; }
  };
  window.toggleEdu = function(item){
    const o = item.classList.contains('open');
    document.querySelectorAll('.edu-item.open').forEach(i => { i.classList.remove('open'); i.querySelector('.edu-body').style.maxHeight='0'; });
    if(!o){ item.classList.add('open'); const b=item.querySelector('.edu-body'); b.style.maxHeight=b.scrollHeight+'px'; }
  };
  window.switchTab = function(btn, pid){
    const p = btn.closest('.exp-body');
    p.querySelectorAll('.exp-tab').forEach(t => t.classList.remove('active'));
    p.querySelectorAll('.exp-panel').forEach(x => x.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(pid).classList.add('active');
    const body = btn.closest('.exp-item').querySelector('.exp-body');
    body.style.maxHeight = 'none';
    setTimeout(() => body.style.maxHeight = body.scrollHeight + 'px', 10);
  };

  /* HERO */
  const ha = document.getElementById('hero-about');
  if(ha) ha.textContent = DATA.about;

  /* EXPERIENCE */
  const el = document.getElementById('exp-list');
  if(el) el.innerHTML = DATA.experience.map((exp, i) => `
    <div class="exp-item reveal" style="transition-delay:${i*.1}s">
      <div class="exp-trigger" onclick="toggleExp(this.closest('.exp-item'))">
        <div>
          <div class="exp-company">${exp.company}</div>
          <div class="exp-role-line">${exp.role}</div>
          <div class="exp-meta-line">${exp.period} · ${exp.location}</div>
        </div>
        <div class="exp-chevron">+</div>
      </div>
      <div class="exp-body" style="max-height:0">
        <div class="exp-tabs">
          <button class="exp-tab active" onclick="switchTab(this,'${exp.id}-sum')">Summary</button>
          <button class="exp-tab" onclick="switchTab(this,'${exp.id}-pts')">Points</button>
          ${exp.projects.length ? `<button class="exp-tab" onclick="switchTab(this,'${exp.id}-prj')">Projects</button>` : ''}
          <button class="exp-tab" onclick="switchTab(this,'${exp.id}-sk')">Skills</button>
        </div>
        <div id="${exp.id}-sum" class="exp-panel active"><p class="exp-summary-text">${exp.summary}</p></div>
        <div id="${exp.id}-pts" class="exp-panel"><ul class="exp-bullets-list">${exp.bullets.map(b=>`<li>${b}</li>`).join('')}</ul></div>
        ${exp.projects.length ? `<div id="${exp.id}-prj" class="exp-panel"><ul class="exp-projects-list">${exp.projects.map(p=>`<li>${p}</li>`).join('')}</ul></div>` : ''}
        <div id="${exp.id}-sk" class="exp-panel"><div class="exp-skills-wrap">${exp.skills.map(s=>`<span class="exp-skill-tag">${s}</span>`).join('')}</div></div>
      </div>
    </div>`).join('');

  /* EDUCATION */
  const eduL = document.getElementById('edu-list');
  if(eduL) eduL.innerHTML = DATA.education.map((edu, i) => `
    <div class="edu-item reveal" style="transition-delay:${i*.1}s">
      <div class="edu-trigger" onclick="toggleEdu(this.closest('.edu-item'))">
        <div>
          <div class="edu-school-name">${edu.school}</div>
          <div class="edu-degree-line">${edu.degree}</div>
          <div class="edu-meta-line">${edu.period} · ${edu.location}</div>
        </div>
        <div class="exp-chevron">+</div>
      </div>
      <div class="edu-body" style="max-height:0">
        <p class="edu-summary">${edu.summary}</p>
        <ul class="edu-highlights">${edu.highlights.map(h=>`<li>${h}</li>`).join('')}</ul>
      </div>
    </div>`).join('');

  /* WRITING */
  const wl = document.getElementById('writing-list');
  if(wl) wl.innerHTML = DATA.articles.map((a, i) => `
    <a href="${a.url}" target="_blank" rel="noopener" class="witem reveal" style="transition-delay:${i*.12}s">
      <div class="witem-num">No. ${String(i+1).padStart(2,'0')}</div>
      <div class="witem-body">
        <div class="witem-cat">${a.category}</div>
        <div class="witem-title">${a.title}</div>
        <div class="witem-excerpt">${a.excerpt}</div>
      </div>
      <div class="witem-meta">
        <span class="witem-date">${a.date}</span>
        <span class="witem-read">Read →</span>
      </div>
    </a>`).join('');

  /* PROJECTS */
  const pg = document.getElementById('proj-grid');
  if(pg) pg.innerHTML = DATA.projects.map((p, i) => {
    const hu = p.url && p.url.length > 0;
    const hc = p.cover && p.cover.length > 0;
    return `<${hu?`a href="${p.url}" target="_blank" rel="noopener"`:'div'} class="proj-card reveal" style="transition-delay:${i*.1}s">
      <div class="proj-card-img">${hc ? `<img src="${p.cover}" alt="${p.title}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=proj-ph><span>${p.type}</span></div>'">` : `<div class="proj-ph"><span>${p.type}</span></div>`}</div>
      <div class="proj-card-body">
        <div class="proj-card-type">${p.type}${p.platform?' · '+p.platform:''}</div>
        <div class="proj-card-title">${p.title}</div>
        <div class="proj-card-desc">${p.description}</div>
        <div class="proj-card-tools">${p.tools.join(' · ')}</div>
        ${hu ? `<div class="proj-card-link">View →</div>` : `<div style="font-size:10px;color:var(--terra,#C1440E);margin-top:10px;letter-spacing:.1em;text-transform:uppercase">Being documented</div>`}
      </div>
    </${hu?'a':'div'}>`;
  }).join('');

  /* CONTACT SOCIALS */
  const cs = document.getElementById('contact-socials');
  if(cs) cs.innerHTML = `
    <a href="${DATA.meta.linkedin}" target="_blank" class="slink"><svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>LinkedIn</a>
    <a href="${DATA.meta.medium}" target="_blank" class="slink"><svg viewBox="0 0 24 24"><ellipse cx="7" cy="12" rx="4" ry="5"/><ellipse cx="16" cy="12" rx="2.5" ry="4.5"/><ellipse cx="22" cy="12" rx="1" ry="4"/></svg>Medium</a>
    <a href="${DATA.meta.instagram}" target="_blank" class="slink"><svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>Instagram</a>
    <a href="${DATA.meta.behance}" target="_blank" class="slink"><svg viewBox="0 0 24 24"><path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 1.2.561 1.877 1.7 1.877.339 0 .985-.19 1.074-.63h2.982zm-2.956-3.485c-.082-1.08-.66-1.752-1.64-1.752-.985 0-1.527.736-1.69 1.752h3.33z"/><path d="M7 13.5c0 1.378 1.122 2.5 2.5 2.5S12 14.878 12 13.5 10.878 11 9.5 11 7 12.122 7 13.5zM2 6h9c2.761 0 5 2.239 5 5s-2.239 5-5 5H2V6zm2 2v6h4.5C10.433 14 12 12.433 12 10.5S10.433 7 8.5 7H4V8z"/></svg>Behance</a>`;

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();
