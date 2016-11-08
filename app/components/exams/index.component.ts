import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

import { Exam } from '../../models/exam'
import { ExamService } from '../../services/exam.service'
import { Tag } from '../../models/tag'
import { TagService } from '../../services/tag.service'

@Component({
  selector: 'exams-index',
  templateUrl: 'app/components/exams/index.component.html',
  styleUrls: ['app/components/exams/exams.component.css'],
  providers: [ExamService, TagService],
})
export class ExamsIndexComponent implements OnInit, AfterViewInit {
  @ViewChild('confirmModal') confirmModal: ElementRef

  public examArray: any
  public modal: any
  public tags: Observable<Tag[]>
  public tagNameArray: string[]
  public searchKeywords: string[]
  private searchTerms = new Subject<string>()

  constructor(
    private examService: ExamService,
    private tagService: TagService,
    private router: Router) {}

  ngOnInit() {
    this.examArray = new Array<Exam>()
    this.searchKeywords = new Array<string>()

    this.examService.all()
        .subscribe(
          data => this.examArray = data,
          err => console.log(err),
          () => console.log('done')
        )

    this.tags = this.searchTerms
                    .debounceTime(300)
                    .distinctUntilChanged()
                    .switchMap(term => {
                      if (term) {
                        return this.tagService.search(term)
                      } else {
                        return []
                      }
                    })
                    .catch(error => {
                      console.log(error)
                      return []
                    })
  }

  ngAfterViewInit() {
    this.modal = this.confirmModal
  }

  editExam(id: number) {
    this.router.navigate(['exams/edit/' + id])
  }

  takeExam(id: number) {
    let r = this.router
    this.modal.confirmModal.show({
      inverted: true,
      duration: 100,
      onApprove: function() {
        r.navigate(['/exams/take/' + id])
      },
      onDeny: function() {
        return true
      },
    })
  }

  search(term: string) {
    this.searchTerms.next(term)
  }

  searchTags(term: string) {
    this.tagService
        .search(term)
        .subscribe((tags) => this.tagNameArray = tags.map((tag) => tag.name))
  }

  chooseTag(tagname: string) {
    this.searchKeywords.push(tagname)
    
    this.examService
        .searchByTags(this.searchKeywords)
        .subscribe(
          data => this.examArray = data,
          err => console.log(err),
          () => console.log('done')
        )

    this.tagNameArray = []
  }

  deleteSearchTag(keyword: string) {
    let index = this.searchKeywords.indexOf(keyword)
    this.searchKeywords.splice(index, 1)

    if (this.searchKeywords.length > 1) {
      this.examService
          .searchByTags(this.searchKeywords)
          .subscribe(
            data => this.examArray = data,
            err => console.log(err),
            () => console.log('done')
          )
    } else {
      this.examService.all()
          .subscribe(
            data => this.examArray = data,
            err => console.log(err),
            () => console.log('done')
          )
    }
  }
}
