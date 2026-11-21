import f from"node:fs"
let{MAKEFUN_INPUT_DIR:I="/input",MAKEFUN_OUTPUT_DIR:O="/output"}=process.env,K,
fl=(s,B,A)=>{let V=new Map([[s,""]]);for(let[u,w]of V)for(let[d,c]of K){let v=u+d;if(A.has(v)&&!B.includes(v)&&!V.has(v))V.set(v,w+c)}return V},
S=t=>{
let L=t.split("\n"),T=L[0].length+2,F=new Set(),G=[],B=[],P=0
K=[[1,"r"],[-1,"l"],[T,"d"],[-T,"u"]]
L.forEach((r,y)=>[...r].forEach((e,x)=>{let p=(y+1)*T+x+1;e!="#"&&F.add(p);e>"$"&&e<"@"&&G.push(p);e<"+"&&e>"#"&&B.push(p);e>"*"&&e!="."&&(P=p)}))
let y=(P/T)|0,C=new Set(),H=new Set(),o="",u=P
for(let p of F)((p/T|0)-y?H:C).add(p)
for(let w of C){
let D=F.has(w+T)?w+T:w-T
if(!F.has(D))continue
let R=new Set(fl(D,"",H).keys()),s=B.filter(R.has,R),A=new Set([...R,...C]),Q=[[s,u,""]],V=new Set(),r=1
for(let[bs,z,m]of Q){
let X=fl(z,bs,A)
if(bs.every(e=>G.includes(e))){o+=m+X.get(w);u=w;r=0;break}
for(let k in bs){let e=bs[k];for(let[d,c]of K){let f=e+d,v=e-d
if(R.has(f)&&!bs.includes(f)&&X.has(v)){
let N=[...bs],Y;N[k]=f;N.sort(),Y=N+":"+Math.min(...fl(e,N,A).keys())
if(!V.has(Y))V.add(Y),Q.push([N,e,m+X.get(v)+c])}}}}
if(r)return""}
return o}
for(let n of"12345"){let i="i00"+n,j=O+"/"+i;f.mkdirSync(j,{recursive:!0});f.writeFileSync(j+"/solution.txt",S(f.readFileSync(I+"/"+i+"/level.txt")+""))}
