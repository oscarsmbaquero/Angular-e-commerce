// typing-effect.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TypingEffectService {
  private _textSubjects: { [key: string]: BehaviorSubject<string> } = {};

  startTypingEffect(key: string, text: string) {
    if (!this._textSubjects[key]) {
      this._textSubjects[key] = new BehaviorSubject<string>('');
    }

    this._startTypingEffect(key, text, 0);
  }

  getText$(key: string) {
    return this._textSubjects[key].asObservable();
  }

  private _startTypingEffect(key: string, text: string, index: number) {
    if (index < text.length) {
      this._textSubjects[key].next(text.substring(0, index + 1));
      index++;
      setTimeout(() => this._startTypingEffect(key, text, index), 100);
    }
  }
}
