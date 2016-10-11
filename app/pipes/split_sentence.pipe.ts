import { Pipe, PipeTransform } from '@angular/core'

@Pipe({name: 'splitSentence'})
export class SplitSentencePipe implements PipeTransform {
  transform(sentence: string): Array<string> {
    return sentence.split(' ')
  }
}
