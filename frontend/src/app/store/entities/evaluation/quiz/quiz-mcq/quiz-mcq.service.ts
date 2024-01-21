import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { QuizMcq } from '@core/entity/evaluation/quiz-mcq.entity'
import { GenericService } from '@store/entities/generic/generic.service'
import { environment } from 'src/environments/environment'

@Injectable({
    providedIn: 'root',
})
export class QuizMcqService extends GenericService<QuizMcq> {
    protected apiUrl = `${environment.baseUrl}${environment.quizMcqUrl}`
    protected serviceUrl = `${environment.baseUrl}${environment.quizServiceUrl}`

    constructor(http: HttpClient) {
        super(http)
    }
}
