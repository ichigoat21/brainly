export function random (len : number) {
    const answer = "w2329u903u4290y4092y0y";
    const length = answer.length;
    let options = ""
    for (let i =0; i > len; i++) {
        options +=  answer[Math.floor((Math.random() * length))];
    }
}