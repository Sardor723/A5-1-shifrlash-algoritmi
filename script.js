function encrypt() {
    // O'zgaruvchilarni olish
    let m = document.getElementById('inputM').value;
    let k = document.getElementById('inputK').value;
    
    // M qiymatlarini ajratish
    let vec_m1 = [];
    while (m > 0) {
        vec_m1.push(m % 10);
        m = Math.floor(m / 10);
    }
    vec_m1.reverse();
    
    // K ni ikkilangan ko'rinishda olish
    let vec = [];
    for (let i = k.length - 1; i >= 0; i--) {
        let n = k.charCodeAt(i);
        while (n > 0) {
            vec.push(n % 2);
            n = Math.floor(n / 2);
        }
        while (vec.length % 8 !== 0) {
            vec.push(0);
        }
    }
    
    // Vektorlarni ajratish
    let vec_x = vec.slice(-19);
    let vec_y = vec.slice(-44, -23);
    let vec_z = vec.slice(-67, -44);

    // Maj uchun 
    let vec_k = [];
    let output = "";
    for (let i = 0; i < vec_m1.length; i++) {
        let x8 = vec_x[8];
        let y10 = vec_y[10];
        let z10 = vec_z[10];
        let Maj = (x8 & y10) | (y10 & z10) | (x8 & z10);
        let a = (((((vec_x[18] + vec_x[17]) % 2) + vec_x[16]) % 2) + vec_x[13]) % 2;
        let b = (vec_y[21] + vec_y[20]) % 2;
        let c = (((((vec_z[22] + vec_z[21]) % 2) + vec_z[20]) % 2) + vec_z[7]) % 2;

        if (x8 === Maj) {
            vec_x.pop();
            vec_x.unshift(a);
        }
        if (y10 === Maj) {
            vec_y.pop();
            vec_y.unshift(b);
        }
        if (z10 === Maj) {
            vec_z.pop();
            vec_z.unshift(c);
        }
        let Kr = (((vec_x[18] + vec_y[21]) % 2) + vec_z[22]) % 2;
        vec_k.push(Kr);
    }

    // Resultlarni chiqarish
    document.getElementById('binaryK').innerHTML = vec_k.join(' ');
    document.getElementById('binaryM').innerHTML = vec_m1.join(' ');
    document.getElementById('xorResult').innerHTML = vec_m1.map((v, i) => (v + vec_k[i]) % 2).join(' ');
}
