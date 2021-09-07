import { Injectable } from '@nestjs/common';
import { Alert } from '../alert/alert.entity';

@Injectable()
export class JobService {
  checkForAlert(alertSetting: Alert, jobTitle: string, jobCity: string) {
    const cities = alertSetting.cities
      .split(',')
      .map(splitted => splitted.trim());
    const keyWords = alertSetting.keyWords
      .split(',')
      .map(keyWord => keyWord.trim());
    for (const preferredCity of cities) {
      if (
        jobCity.indexOf(preferredCity) > -1 &&
        this.checkForKeyWord(keyWords, jobTitle)
      ) {
          return true;
      }
    }

    return false; 
  }

  private checkForKeyWord(keyWords: string[], title: string): Boolean {
    for (const keyWord of keyWords) {
      if (title.indexOf(keyWord) > -1) {
        return true;
      }
    }
    return false;
  }
}
