import{j as e}from"./index-BlpGUuv6.js";import{r as n}from"./react-vendor-DSQSPd6x.js";import{S as d,N as x}from"./Navbar-CF3fWTim.js";import{F as g}from"./Footer-hqeVHaKu.js";import{a as h}from"./helmet-vendor-CfsiWrbN.js";import"./i18n-vendor-DUK_XkEA.js";import"./api-zbxc3OqG.js";const N=()=>{const[r,i]=n.useState(""),[a,c]=n.useState("Politique de confidentialité"),[o,m]=n.useState(!0),[p,s]=n.useState(!1);return n.useEffect(()=>{fetch("/wp-json/wp/v2/pages?slug=privacy-policy").then(t=>t.json()).then(t=>{t&&t.length>0?(c(t[0].title.rendered),i(t[0].content.rendered)):s(!0)}).catch(()=>s(!0)).finally(()=>m(!1))},[]),e.jsxs(e.Fragment,{children:[e.jsxs(h,{children:[e.jsx("title",{children:"Politique de confidentialité | Amadal Global Systems"}),e.jsx("meta",{name:"description",content:"Politique de confidentialité d'Amadal Global Systems."}),e.jsx("meta",{name:"robots",content:"noindex, follow"}),e.jsx("link",{rel:"canonical",href:`${d}/privacy-policy`})]}),e.jsx(x,{}),e.jsxs("div",{className:"min-h-screen bg-[#f7faf9] pt-16",children:[e.jsx("div",{className:"bg-white border-b border-gray-100",children:e.jsx("div",{className:"max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-16 py-12 lg:py-16",children:e.jsxs("div",{className:"flex flex-col gap-3 max-w-2xl",children:[e.jsxs("div",{className:"inline-flex items-center gap-2",children:[e.jsx("span",{className:"w-2 h-2 rounded-full bg-primary/50"}),e.jsx("span",{className:"text-xs font-semibold uppercase tracking-[0.18em] text-primary/60",children:"Légal"})]}),o?e.jsx("div",{className:"h-10 w-72 bg-gray-200 rounded-lg animate-pulse"}):e.jsx("h1",{className:"text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight",dangerouslySetInnerHTML:{__html:a}}),e.jsx("p",{className:"text-gray-500 text-sm",children:"Dernière mise à jour : avril 2025"})]})})}),e.jsx("div",{className:"max-w-[860px] mx-auto px-5 sm:px-8 lg:px-16 py-12 lg:py-16",children:o?e.jsx("div",{className:"flex flex-col gap-4",children:[...Array(6)].map((t,l)=>e.jsx("div",{className:"h-4 bg-gray-200 rounded animate-pulse",style:{width:`${80+l%3*10}%`}},l))}):p?e.jsx("p",{className:"text-gray-500 text-sm",children:"Contenu non disponible."}):e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
              .wp-content h1, .wp-content h2, .wp-content h3, .wp-content h4 {
                font-weight: 700;
                color: #111827;
                margin-top: 2rem;
                margin-bottom: 0.75rem;
                line-height: 1.3;
              }
              .wp-content h1 { font-size: 1.75rem; }
              .wp-content h2 { font-size: 1.25rem; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem; }
              .wp-content h3 { font-size: 1.05rem; }
              .wp-content p {
                font-size: 0.9rem;
                color: #4b5563;
                line-height: 1.8;
                margin-bottom: 1rem;
              }
              .wp-content ul, .wp-content ol {
                padding-left: 1.5rem;
                margin-bottom: 1rem;
                display: flex;
                flex-direction: column;
                gap: 0.35rem;
              }
              .wp-content ul { list-style-type: disc; }
              .wp-content ol { list-style-type: decimal; }
              .wp-content li {
                font-size: 0.9rem;
                color: #4b5563;
                line-height: 1.7;
              }
              .wp-content a {
                color: #048162;
                text-decoration: none;
              }
              .wp-content a:hover { text-decoration: underline; }
              .wp-content strong { color: #1f2937; font-weight: 600; }
              .wp-content hr {
                border: none;
                border-top: 1px solid #e5e7eb;
                margin: 2rem 0;
              }
              .wp-content blockquote {
                border-left: 3px solid #048162;
                padding-left: 1rem;
                margin: 1.5rem 0;
                color: #6b7280;
                font-style: italic;
              }
            `}),e.jsx("div",{className:"wp-content",dangerouslySetInnerHTML:{__html:r}})]})})]}),e.jsx(g,{})]})};export{N as default};
