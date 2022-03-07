import { Component, OnInit } from '@angular/core';
import * as c3 from 'c3';
import { Nekretnina } from '../model/nekretnina.model';
import { Purchase } from '../model/purchase.model';
import { NekretninaService } from '../services/nekretnina.service';

@Component({
  selector: 'app-grafikoni',
  templateUrl: './grafikoni.component.html',
  styleUrls: ['./grafikoni.component.css']
})
export class GrafikoniComponent implements OnInit {

  constructor(private nekretnineService: NekretninaService) { }

  ngOnInit(): void {

  }

  brojGradova: any = [0]
  rangovi: any = [0, 0, 0, 0]
  kuce: any = 0
  stanovi: any = 0
  gradovi: string[] = [""]
  prihod: any = [0,0]
  ukPrihod: number=0

  ngAfterViewInit() {
    this.nekretnineService.pregledNekretnina().subscribe((nekretnine: Nekretnina[]) => {
      nekretnine.forEach(nekretnina => {
        if (!this.gradovi.includes(nekretnina.grad)) {
          this.gradovi.push(nekretnina.grad)
          this.brojGradova.push(0)
        }
        if (nekretnina.tip == 'kuca') this.kuce++
        else if (nekretnina.tip == 'stan') this.stanovi++
        if (nekretnina.cena < 50000) this.rangovi[0]++
        else if (nekretnina.cena > 49999 && nekretnina.cena < 100000) this.rangovi[1]++
        else if (nekretnina.cena > 99999 && nekretnina.cena < 150000) this.rangovi[2]++
        else this.rangovi[3]++
      });
      this.gradovi.shift();
      this.brojGradova.shift();

      nekretnine.forEach(nekretnina => {
        for (let i = 0; i < this.gradovi.length; i++)
          if (this.gradovi[i] == nekretnina.grad) {
            this.brojGradova[i]++
            break
          }
      })
      this.brojGradova.unshift("Gradovi")
      this.rangovi.unshift("Nekretnina po cenovnom rangu")

      console.log(this.rangovi)

      var gradovi = c3.generate({
        bindto: '#gradovi',
        data: {
          columns: [this.brojGradova],
          type: 'bar'
        },
        bar: {
          //width: 50
          width:{
            ratio: 0.9
          }
        },
        axis: {
          x: {
            type: 'category',
            categories: this.gradovi
          }
        }
      });

      var tipovi = c3.generate({
        bindto: '#tipovi',
        data: {
          columns: [
            ['Tipovi', this.kuce, this.stanovi]
          ],
          type: 'bar'
        },
        bar: {
          //width: 50
          width:{
            ratio: 0.5
          }
        },
        axis: {
          x: {
            type: 'category',
            categories: ['Kuce', 'Stanovi']
          }
        }
      });

      var rangovi = c3.generate({
        bindto: '#rangovi',
        data: {
          columns: [this.rangovi],
          type: 'bar'
        },
        bar: {
          //width: 50
          width:{
            ratio: 0.5
          }
        },
        axis: {
          x: {
            type: 'category',
            categories: ['<50k', '50k-100k', '100k-150k', '150k+']
          }
        }
      });
    });

    this.nekretnineService.pregledProdaja().subscribe((prodaje: Purchase[]) => {
      prodaje.forEach(prodaja=>{
        if(prodaja.vlasnik=="agencija")this.prihod[0]+=prodaja.cena
        else this.prihod[1]+=prodaja.cena*0.05
      })
      this.ukPrihod=this.prihod[0]+this.prihod[1]

      var prihod = c3.generate({
        bindto:'#prihod',
        data: {
            // iris data from R
            columns: [
                ['Udeo prodaja agencije u prihodu', this.prihod[0]],
                ['Udeo prodaja korisnika u prihodu', this.prihod[1]],
            ],
            type : 'pie',
            onmouseover: function (d) { console.log("onmouseover", d); },
            onmouseout: function (d) { console.log("onmouseout", d); }
        }
    });
    });

  }//ngafterviewinit

}
