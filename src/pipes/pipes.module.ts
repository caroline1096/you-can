import { NgModule } from '@angular/core';
import { SearchPipe } from './search/search';
import { TipoPontoPipe } from './tipo-ponto/tipo-ponto';
@NgModule({
	declarations: [SearchPipe,
    TipoPontoPipe],
	imports: [],
	exports: [SearchPipe,
    TipoPontoPipe]
})
export class PipesModule {}
