import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data.service';
import { Produitt } from '../produitt';
@Component({
  selector: 'app-detaills',
  templateUrl: './detaills.component.html',
  styleUrls: ['./detaills.component.css']
})
export class DetaillsComponent implements OnInit{

  imageDirectory = "http://localhost:8000/images/articles/";
id!: number;
private sub: any;
article!: any;
categorie!: any;
similar_article: Produitt[] = [];
constructor(private route: ActivatedRoute, private articleService: DataService,) { }

ngOnInit(): void {
  this.similar_article.length = 0;
  this.sub = this.route.params.subscribe(params => {
    this.id = +params['id']; // (+) converts string 'id' to a number
    this.find_article_by_id();
  })
}

find_article_by_id() {
  this.articleService.getOneArticle(this.id).subscribe(article => {
    console.log(article);
    this.article = article;
    this.article = this.article.article;
    this.categorie = this.article.categorie_id;
    this.getSimilarArticle();
  })
}

getSimilarArticle() {
  this.articleService.getData().subscribe(Articles => {
    this.similar_article.length = 0
    for (var art of Object.values(Articles)) {
      if (art.categorie_id == this.categorie && art.Nom_Produit != this.article.nomArticle)
        this.similar_article.push(art);
      // console.log(" ------------  the similar article  - - - - - - -")
      // console.log(this.similar_article)
    }
  })
}
scroll(id: string){
  let el = document.getElementById(id);
  console.log(id);
  el!.scrollIntoView();
}
}
