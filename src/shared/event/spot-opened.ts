export class SpotOpenedEvent {
  constructor(
    public readonly email: string,
    public readonly name: string,
    public readonly event: string
  ) {}
}
