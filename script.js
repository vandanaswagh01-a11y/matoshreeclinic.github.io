const menuBtn=document.querySelector('.menu-btn');
const nav=document.querySelector('.nav-links');

if(menuBtn){
  menuBtn.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded',open ? 'true' : 'false');
  });
  document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>{
    nav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded','false');
  }));
}

// Appointment form: available time options change with the selected day.
const dateInput=document.getElementById('appointmentDate');
const timeSelect=document.getElementById('appointmentTime');

const schedule={
  0:['10:30 AM–2:00 PM','6:30 PM–9:30 PM'], // Sunday
  1:['10:30 AM–2:00 PM','6:30 PM–9:30 PM'],
  2:['10:30 AM–2:00 PM','6:30 PM–9:30 PM'],
  3:['10:30 AM–2:00 PM','6:30 PM–9:30 PM'],
  4:['10:30 AM–2:00 PM','6:30 PM–9:30 PM'],
  5:['10:30 AM–2:00 PM','6:30 PM–9:30 PM'],
  6:['10:30 AM–2:00 PM']
};

function localDateString(){
  const d=new Date();
  const offset=d.getTimezoneOffset();
  const local=new Date(d.getTime()-offset*60000);
  return local.toISOString().slice(0,10);
}

if(dateInput){
  dateInput.min=localDateString();
  dateInput.addEventListener('change',()=>{
    const selected=new Date(`${dateInput.value}T12:00:00`);
    const day=selected.getDay();
    const options=schedule[day] || [];
    timeSelect.innerHTML='<option value="">Select time</option>';
    options.forEach(time=>{
      const option=document.createElement('option');
      option.value=time;
      option.textContent=time;
      timeSelect.appendChild(option);
    });
  });
}

const appointmentForm=document.getElementById('appointmentForm');
if(appointmentForm){
  appointmentForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    const name=document.getElementById('patientName').value.trim();
    const phone=document.getElementById('patientPhone').value.trim();
    const date=document.getElementById('appointmentDate').value;
    const time=document.getElementById('appointmentTime').value;
    const reason=document.getElementById('visitReason').value.trim();

    if(!name || !phone || !date || !time) return;

    const formattedDate=new Date(`${date}T12:00:00`).toLocaleDateString('en-IN',{
      day:'2-digit',month:'long',year:'numeric'
    });

    const message=[
      'Hello Matoshree Clinic, I would like to request an appointment.',
      '',
      `Patient name: ${name}`,
      `Phone: ${phone}`,
      `Preferred date: ${formattedDate}`,
      `Preferred time: ${time}`,
      reason ? `Reason for visit: ${reason}` : ''
    ].filter(Boolean).join('\n');

    window.open(`https://wa.me/919422753278?text=${encodeURIComponent(message)}`,'_blank','noopener');
  });
}

// Simple click-to-enlarge gallery.
const lightbox=document.getElementById('lightbox');
const lightboxImage=document.getElementById('lightboxImage');
const closeLightbox=()=>{
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden','true');
  lightboxImage.src='';
};

document.querySelectorAll('[data-lightbox]').forEach(item=>{
  item.addEventListener('click',()=>{
    lightboxImage.src=item.dataset.lightbox;
    lightboxImage.alt=item.querySelector('img')?.alt || 'Clinic photograph';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden','false');
  });
});

if(lightbox){
  lightbox.addEventListener('click',(event)=>{
    if(event.target===lightbox || event.target.classList.contains('lightbox-close')) closeLightbox();
  });
  document.addEventListener('keydown',(event)=>{
    if(event.key==='Escape') closeLightbox();
  });
}
