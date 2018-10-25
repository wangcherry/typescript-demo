const fs = require('fs');
const TypescriptParser = require('typescript-parser').TypescriptParser;
const parser = new TypescriptParser();

const filePath = './src/examples/my.component.ts';

parser.parseFile(filePath).then(res => {
    const jsonFile = filePath.replace(/\.ts$/, '.json');
    if(fs.existsSync(jsonFile)) {
        fs.writeFileSync(jsonFile, JSON.stringify(res), (err) => {
            if(err) console.log(err)
            else console.log('写文件操作成功');
        })
    }else {
        fs.open(jsonFile, 0644 , (err) => {
            if(err) console.log(err)
            else {
                fs.writeFileSync(jsonFile, JSON.stringify(res), (err1) => {
                    if(err1) console.log(err1)
                    else console.log('写文件操作成功');
                })
            }
        });
    }
}, () => {});

parser.parseSource(filePath).then(res => {
    // console.log(res)
}, () => {});