import {Subscription} from 'rxjs'

export class Subscriptions {
  private subs: Subscription[] = []

  set add(sub: Subscription) {
    this.subs.push(sub)
  }

  unsubscribe() {
    this.subs.forEach((sub) => sub?.unsubscribe())
  }
}
