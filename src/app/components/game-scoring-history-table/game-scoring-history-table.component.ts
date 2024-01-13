import { Component, Input } from '@angular/core'

import { GameHistoryTableIncomingDataFormat } from '../../domain'

@Component({
  selector: 'app-game-scoring-history-table',
  templateUrl: './game-scoring-history-table.component.html',
  styleUrls: ['./game-scoring-history-table.component.scss'],
})
export class GameScoringHistoryTableComponent {
  displayedColumns: string[] = ['rollNumber', 'firstRoll', 'secondRoll']

  @Input()
  dataSource: GameHistoryTableIncomingDataFormat[] = []
}
