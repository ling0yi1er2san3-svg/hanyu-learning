#!/usr/bin/env python3
import json, pathlib, subprocess, sys

ROOT = pathlib.Path(__file__).resolve().parents[1] / 'public' / 'data-v2'


def translit(text: str) -> str:
    if not text or not text.strip():
        return ''
    proc = subprocess.run(
        ['uconv', '-x', 'Han-Latin'], input=text, text=True,
        stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True
    )
    # ICU can leave spaces before punctuation; lightly normalize without changing readings.
    s = proc.stdout.strip()
    for a,b in [(' ，', '，'), (' 。','。'), (' ！','！'), (' ？','？'), (' ：','：'), (' ；','；'), (' 、','、')]:
        s=s.replace(a,b)
    return s

changed_files=0
generated_dialogue=0
generated_texts=0
existing=0
for book_dir in sorted(ROOT.glob('book[1-6]')):
    for fp in sorted(book_dir.glob('lesson*.json')):
        d=json.load(open(fp,encoding='utf-8'))
        if d.get('sourceStatus') != 'core_structured':
            continue
        changed=False
        for dia in d.get('dialogues',[]) or []:
            for line in dia.get('lines',[]) or []:
                if line.get('chinese') and not line.get('pinyin'):
                    line['pinyin']=translit(line['chinese'])
                    line['pinyinStatus']='generated_icu_han_latin'
                    generated_dialogue += 1
                    changed=True
                elif line.get('pinyin'):
                    existing += 1
                    line.setdefault('pinyinStatus','existing_curated')
        for t in d.get('texts',[]) or []:
            if t.get('chinese') and not t.get('pinyin'):
                t['pinyin']=translit(t['chinese'])
                t['pinyinStatus']='generated_icu_han_latin'
                generated_texts += 1
                changed=True
            elif t.get('pinyin'):
                existing += 1
                t.setdefault('pinyinStatus','existing_curated')
        # Coverage metadata deliberately separates completeness from verification.
        ver=d.setdefault('verification',{})
        all_units=[]
        all_units += [line for dia in d.get('dialogues',[]) or [] for line in dia.get('lines',[]) or [] if line.get('chinese')]
        all_units += [t for t in d.get('texts',[]) or [] if t.get('chinese')]
        if all_units:
            ver['pinyinCoverageComplete']=all(bool(x.get('pinyin')) for x in all_units)
            ver['pinyinSourceVerified']=False
            ver['pinyinMethod']='mixed_existing_and_icu_han_latin'
        if changed:
            changed_files += 1
        with open(fp,'w',encoding='utf-8') as f:
            json.dump(d,f,ensure_ascii=False,indent=2)
            f.write('\n')

print(f'files={changed_files} generated_dialogue_lines={generated_dialogue} generated_texts={generated_texts} existing_pinyin_units={existing}')
