// パラメーターを計算して返すよ
const calcParams = (sup, sch) => {

    let r = [...sup.baseParams]; // 初期値にする
    let s = {lesson:[0,0], spLesson:[0,0], class:[0,0], rest:[0,0], soudan:[0,0], goOut:[0,0], provide:[0,0]};

    sch.forEach((elm, week) => {
        let paramIndex;

        switch(elm.selectType) {
            case'vocal':
            case'dance':
            case'visual':
                paramIndex = getParamIndex(elm.selectType);
                if(elm.week === 'normal') {
                    // レッスン上昇量を加算
                    r[paramIndex]
                        += calcLessonIncrease(sup, elm.increase[1], paramIndex);

                    // サポートイベントも加算
                    s.lesson[0] += 1;
                    s.spLesson[0] += 1;  
                    
                } else if(elm.week === 'oikomi') {
                    for(let i=0;i < r.length; i++) {
                        // 選択パラメータだけ上昇量を大きく
                        r[i] += calcLessonIncrease(sup, elm.increase[i===paramIndex?1:0], i, true);
                    }
                }
                break;

            case 'class':
                paramIndex = getParamIndex(elm.classType);
                r[paramIndex] += elm.cIncrease; // 授業の上昇量
                s.class[0] += 1;
                // r = sumArray(r, calcSupportEvent(sup, 'selectClass')); // サポートの上昇量
                break;

            case 'rest': // お休み or 相談 or お出かけ or 活動支給
            case 'soudan':
            case 'goOut':
            case 'provide':
                const str = elm.selectType; 
                s[elm.selectType][0] += 1; // サポート上昇
                // r = sumArray(r, calcSupportEvent(sup, 'select' + str.charAt(0).toUpperCase()+str.slice(1)));
                break; 
        }
    });
    r = sumArray(r, calcSupportEvent(sup, 'endTest')); // 試験終了サポート

    // サポート上昇分を加算
    const supIncrease = calcSupportIncrease(sup, s);
    r = sumArray(r, supIncrease.param);
    for(const type in s) {
        s[type][1] = supIncrease.s[type];
    }

    r = r.map((elm) => Math.ceil(elm)); // 切り上げやないかーい
    r = r.map((elm) => elm + 50); // 試験一位ボーナス
    r = calcArrayMax(r, 1800);  // 上限
    return {params:r, supports:s};
}

// レッスンの上昇量を計算
const calcLessonIncrease = (sup, base, index, oikomi=false) => {
    return Math.ceil((base + (oikomi?0:sup.limitIncrease)) * (1 + sup.lessonBonus[index] / 100));
}

// サポート上昇分を計算
const calcSupportIncrease = (sup, s) => {
    let result = {s:{lesson:0, spLesson:0, class:0, rest:0, soudan:0, goOut:0, provide:0},param:[0,0,0]}; // return用

    // サポートによる上昇量sと上昇分のパラメータparamを計算
    for(const type in s) {
        const supName = type==='lesson'||type==='spLesson' ? type:'select' + type.charAt(0).toUpperCase()+type.slice(1);
        const supIncrease = calcSupportEvent(sup, supName);
        console.log(supIncrease);
        result.s[type] = supIncrease.reduce((a, c) => a + c, 0) * s[type][0];
        result.param = sumArray(result.param, multiArray(supIncrease, s[type][0]));
    }

    console.log(result);
    return result;
}

// 配列の各要素同士の和を配列として返すよ
const sumArray = (a1, a2) => {
    return a1.map((elm, index) => elm + a2[index]);
}

// 文字列をindexにして返すよ
const getParamIndex = (param) => {
    return param==='vocal'?0:param==='dance'?1:2;
}

// サポートイベントの上昇量を計算 (配列)
const calcSupportEvent = (sup, action) => {
    return sup[action];
}

// 配列の各要素を最大値で均すよ
const calcArrayMax = (a, max) => {
    return a.map((elm) => elm > max ? max : elm);
}

// 配列の各要素をかけるよ
const multiArray = (a1, m) => {
    return a1.map((elm) => elm * m);
}

export default calcParams;