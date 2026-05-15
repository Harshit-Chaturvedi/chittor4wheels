// ===== INTRO =====
setTimeout(()=>{document.getElementById('introScreen').classList.add('done')},3800);

// ===== PARTICLES =====
(function(){
const c=document.getElementById('particleCanvas'),x=c.getContext('2d');let ps=[];
function rz(){c.width=c.parentElement.offsetWidth;c.height=c.parentElement.offsetHeight}
rz();window.addEventListener('resize',rz);
class P{constructor(){this.r()}r(){this.x=Math.random()*c.width;this.y=Math.random()*c.height;this.s=Math.random()*1.5+.5;this.dx=(Math.random()-.5)*.4;this.dy=(Math.random()-.5)*.4;this.o=Math.random()*.4+.1}
u(){this.x+=this.dx;this.y+=this.dy;if(this.x<0||this.x>c.width||this.y<0||this.y>c.height)this.r()}
d(){x.beginPath();x.arc(this.x,this.y,this.s,0,Math.PI*2);x.fillStyle=`rgba(0,180,255,${this.o})`;x.fill()}}
for(let i=0;i<50;i++)ps.push(new P());
(function a(){x.clearRect(0,0,c.width,c.height);ps.forEach(p=>{p.u();p.d()});requestAnimationFrame(a)})();
})();

// ===== NAVBAR =====
const nb=document.getElementById('navbar'),nt=document.getElementById('navToggle'),nl=document.getElementById('navLinks');
window.addEventListener('scroll',()=>nb.classList.toggle('scrolled',scrollY>50));
nt.addEventListener('click',()=>{nt.classList.toggle('active');nl.classList.toggle('open')});
document.querySelectorAll('.nav-link').forEach(l=>l.addEventListener('click',()=>{nt.classList.remove('active');nl.classList.remove('open')}));

// ===== COUNTER =====
function animC(){document.querySelectorAll('.stat-num').forEach(e=>{const t=+e.dataset.target,d=2000,s=performance.now();
(function step(n){const p=Math.min((n-s)/d,1);e.textContent=Math.floor(p*t);if(p<1)requestAnimationFrame(step)})(performance.now())})}
const sO=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){animC();sO.unobserve(x.target)}}),{threshold:.5});
document.querySelector('.hero-stats')&&sO.observe(document.querySelector('.hero-stats'));

// ===== CAR DATA =====
const STORE_KEY='c4w_cars';
function getCars(){return JSON.parse(localStorage.getItem(STORE_KEY)||'[]')}
function saveCars(c){localStorage.setItem(STORE_KEY,JSON.stringify(c))}

// Demo cars - images is now an array
if(getCars().length===0){
saveCars([
{id:1,name:'Maruti Swift VXI',year:2021,km:28000,fuel:'Petrol',type:'hatchback',images:['https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600&h=400&fit=crop']},
{id:2,name:'Hyundai Creta SX',year:2022,km:18000,fuel:'Diesel',type:'suv',images:['https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=600&h=400&fit=crop']},
{id:3,name:'Honda City ZX',year:2020,km:35000,fuel:'Petrol',type:'sedan',images:['https://images.unsplash.com/photo-1606611013016-969c19ba27b5?w=600&h=400&fit=crop']},
{id:4,name:'Maruti Baleno Alpha',year:2022,km:22000,fuel:'Petrol',type:'hatchback',images:['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop']},
{id:5,name:'Hyundai Verna SX(O)',year:2021,km:30000,fuel:'Diesel',type:'sedan',images:['https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&h=400&fit=crop']},
{id:6,name:'Tata Nexon XZ+',year:2023,km:12000,fuel:'Petrol',type:'suv',images:['https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop']}
])}

// ===== RENDER CARS =====
const FB='https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&h=400&fit=crop';
function getMainImg(car){
  // Support both old 'image' field and new 'images' array
  if(car.images && car.images.length) return car.images[0];
  if(car.image) return car.image;
  return FB;
}
function renderCars(filter='all'){
const g=document.getElementById('carGrid'),e=document.getElementById('emptyState');
const cars=getCars(),f=filter==='all'?cars:cars.filter(c=>c.type===filter);
g.innerHTML='';
if(!f.length){e.style.display='block';return}
e.style.display='none';
f.forEach((car,i)=>{
const imgCount = car.images ? car.images.length : 1;
const d=document.createElement('div');d.className='car-card';d.style.animationDelay=i*.08+'s';
d.innerHTML=`<div class="car-card-img"><img src="${getMainImg(car)}" alt="${car.name}" onerror="this.src='${FB}'"><div class="car-card-badge">${car.fuel}</div>${imgCount>1?`<div class="car-card-badge" style="left:auto;right:.8rem"><i class="fas fa-images"></i> ${imgCount}</div>`:''}</div>
<div class="car-card-body"><h3 class="car-card-name">${car.name}</h3>
<div class="car-card-specs"><div class="car-spec"><i class="fas fa-calendar-alt"></i> ${car.year}</div><div class="car-spec"><i class="fas fa-tachometer-alt"></i> ${Number(car.km).toLocaleString()} km</div><div class="car-spec"><i class="fas fa-gas-pump"></i> ${car.fuel}</div><div class="car-spec"><i class="fas fa-car"></i> ${car.type[0].toUpperCase()+car.type.slice(1)}</div></div>
<div class="car-card-footer"><button class="btn btn-glow vbtn" data-id="${car.id}"><i class="fas fa-eye"></i> View</button><a href="https://wa.me/919413316324?text=Hi%2C%20I%20am%20interested%20in%20${encodeURIComponent(car.name)}" class="btn btn-whatsapp" target="_blank"><i class="fab fa-whatsapp"></i> Enquire</a></div></div>`;
g.appendChild(d)});
document.querySelectorAll('.vbtn').forEach(b=>b.addEventListener('click',ev=>{ev.stopPropagation();openModal(+b.dataset.id)}));
}
renderCars();

// ===== FILTERS =====
document.querySelectorAll('.fbtn').forEach(b=>b.addEventListener('click',()=>{
document.querySelectorAll('.fbtn').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderCars(b.dataset.filter)}));

// ===== MODAL WITH GALLERY =====
let modalImages=[];
let modalIdx=0;

function updateGallery(){
  document.getElementById('modalImg').src=modalImages[modalIdx];
  document.getElementById('galCounter').textContent=`${modalIdx+1} / ${modalImages.length}`;
  // Update thumbs
  document.querySelectorAll('.gal-thumbs img').forEach((t,i)=>{
    t.classList.toggle('active',i===modalIdx);
  });
  // Show/hide nav buttons
  document.getElementById('galPrev').style.display=modalImages.length>1?'flex':'none';
  document.getElementById('galNext').style.display=modalImages.length>1?'flex':'none';
}

function openModal(id){
const c=getCars().find(x=>x.id===id);if(!c)return;
modalImages=c.images||[c.image||FB];
modalIdx=0;
document.getElementById('modalImg').src=modalImages[0];
document.getElementById('modalName').textContent=c.name;
document.getElementById('modalYear').textContent=c.year;
document.getElementById('modalKm').textContent=Number(c.km).toLocaleString()+' km';
document.getElementById('modalFuel').textContent=c.fuel;
document.getElementById('modalType').textContent=c.type[0].toUpperCase()+c.type.slice(1);
// Build thumbs
const thumbs=document.getElementById('galThumbs');
thumbs.innerHTML='';
if(modalImages.length>1){
  modalImages.forEach((src,i)=>{
    const img=document.createElement('img');img.src=src;img.alt='Thumb';
    if(i===0)img.classList.add('active');
    img.addEventListener('click',()=>{modalIdx=i;updateGallery()});
    thumbs.appendChild(img);
  });
}
updateGallery();
document.getElementById('carModal').classList.add('show');document.body.style.overflow='hidden'}

document.getElementById('galPrev').addEventListener('click',()=>{modalIdx=(modalIdx-1+modalImages.length)%modalImages.length;updateGallery()});
document.getElementById('galNext').addEventListener('click',()=>{modalIdx=(modalIdx+1)%modalImages.length;updateGallery()});

function closeModal(){document.getElementById('carModal').classList.remove('show');document.body.style.overflow=''}
document.getElementById('modalClose').addEventListener('click',closeModal);
document.getElementById('carModal').addEventListener('click',e=>{if(e.target===e.currentTarget)closeModal()});

// ===== ADMIN SIDEBAR =====
const ADMIN_PASS='chittor4wheels2026';
let isAdmin=sessionStorage.getItem('c4w_admin')==='true';

function openAdmin(){
document.getElementById('adminSidebar').classList.add('open');
document.getElementById('adminOverlay').classList.add('open');
document.body.style.overflow='hidden';
// Close mobile nav if open
nt.classList.remove('active');nl.classList.remove('open');
}
function closeAdmin(){
document.getElementById('adminSidebar').classList.remove('open');
document.getElementById('adminOverlay').classList.remove('open');
document.body.style.overflow='';
}
document.getElementById('adminToggleBtn').addEventListener('click',openAdmin);
document.getElementById('adminCloseBtn').addEventListener('click',closeAdmin);
document.getElementById('adminOverlay').addEventListener('click',closeAdmin);

function checkAdmin(){
if(isAdmin){document.getElementById('adminLogin').style.display='none';document.getElementById('adminDash').style.display='block';renderManage()}}
checkAdmin();

document.getElementById('adminLoginBtn').addEventListener('click',()=>{
const p=document.getElementById('adminPass').value;
if(p===ADMIN_PASS){isAdmin=true;sessionStorage.setItem('c4w_admin','true');
document.getElementById('adminLogin').style.display='none';document.getElementById('adminDash').style.display='block';
document.getElementById('loginError').textContent='';renderManage();showToast('✅ Welcome, Rajendra Ji!')}
else{document.getElementById('loginError').textContent='❌ Wrong password!'}});

document.getElementById('adminPass').addEventListener('keydown',e=>{if(e.key==='Enter')document.getElementById('adminLoginBtn').click()});

document.getElementById('adminLogout').addEventListener('click',()=>{
isAdmin=false;sessionStorage.removeItem('c4w_admin');
document.getElementById('adminDash').style.display='none';document.getElementById('adminLogin').style.display='block';
showToast('Logged out')});

// ===== MULTI-IMAGE UPLOAD =====
let imgDataArr=[];
document.getElementById('carImage').addEventListener('change',e=>{
const files=Array.from(e.target.files);
if(!files.length)return;
imgDataArr=[];
const preview=document.getElementById('uploadPreview');
const thumbDiv=document.getElementById('thumbPreview');
thumbDiv.innerHTML='';

let loaded=0;
files.forEach((f,i)=>{
  const r=new FileReader();
  r.onload=ev=>{
    imgDataArr[i]=ev.target.result;
    loaded++;
    // Show first image in main preview
    if(i===0){preview.innerHTML=`<img src="${ev.target.result}" alt="Preview">`;preview.classList.add('has-img')}
    // Add thumbnail
    const thumb=document.createElement('img');thumb.src=ev.target.result;thumbDiv.appendChild(thumb);
    if(loaded===files.length){
      document.getElementById('fileDisplay').querySelector('span').textContent=`${files.length} photo${files.length>1?'s':''} selected`;
    }
  };
  r.readAsDataURL(f);
});
});

// ===== ADD CAR =====
document.getElementById('carForm').addEventListener('submit',e=>{
e.preventDefault();if(!imgDataArr.length){showToast('Please upload at least one photo!');return}
const cars=getCars();
cars.unshift({id:Date.now(),name:document.getElementById('carName').value,year:+document.getElementById('carYear').value,
km:+document.getElementById('carKm').value,fuel:document.getElementById('carFuel').value,
type:document.getElementById('carType').value,images:imgDataArr});
saveCars(cars);renderCars();renderManage();e.target.reset();imgDataArr=[];
const p=document.getElementById('uploadPreview');p.innerHTML='<i class="fas fa-cloud-upload-alt"></i><p>Photo Preview</p>';p.classList.remove('has-img');
document.getElementById('thumbPreview').innerHTML='';
document.getElementById('fileDisplay').querySelector('span').textContent='Click to upload multiple photos';
showToast('🚗 Car added successfully!')});

// ===== MANAGE / DELETE =====
function renderManage(){
const g=document.getElementById('manageGrid');if(!g)return;
const cars=getCars();g.innerHTML='';
if(!cars.length){g.innerHTML='<p style="color:var(--txt2)">No cars listed yet.</p>';return}
cars.forEach(c=>{
const d=document.createElement('div');d.className='manage-item';
const imgSrc=getMainImg(c);
const count=c.images?c.images.length:1;
d.innerHTML=`<img src="${imgSrc}" alt="${c.name}" onerror="this.src='${FB}'"><div><h4>${c.name}</h4><p>${c.year} • ${c.fuel} • ${Number(c.km).toLocaleString()} km • ${count} photo${count>1?'s':''}</p></div><button class="del-btn" data-id="${c.id}"><i class="fas fa-trash"></i></button>`;
g.appendChild(d)});
document.querySelectorAll('.del-btn').forEach(b=>b.addEventListener('click',()=>{
if(confirm('Delete this car?')){const cars=getCars().filter(x=>x.id!==+b.dataset.id);saveCars(cars);renderCars();renderManage();showToast('Car deleted')}}));}

// ===== TOAST =====
function showToast(m){const t=document.getElementById('toast');document.getElementById('toastMsg').textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),3000)}

// ===== SCROLL ACTIVE NAV =====
const secs=document.querySelectorAll('section');
window.addEventListener('scroll',()=>{let cur='';secs.forEach(s=>{if(scrollY>=s.offsetTop-200)cur=s.id});
document.querySelectorAll('.nav-link').forEach(l=>l.classList.toggle('active',l.getAttribute('href')==='#'+cur))});
