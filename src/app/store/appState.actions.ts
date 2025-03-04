export class GetPartnerId {
  public static readonly type = '[AppState] Get PartnerId';
}

export class SetIsLoading {
  public static readonly type = '[AppState] Set IsLoading';
  constructor(public isLoading: boolean) {}
}
