import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth'

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {

  userName = ''
  userPlan = 'free'

  plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      description: 'Para começar',
      features: ['1 usuário', '5 projetos', 'Suporte por e-mail']
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 49,
      description: 'Para profissionais',
      features: ['5 usuários', 'Projetos ilimitados', 'Suporte prioritário', 'Relatórios avançados']
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 199,
      description: 'Para times',
      features: ['Usuários ilimitados', 'Projetos ilimitados', 'Suporte 24/7', 'SLA garantido', 'API dedicada']
    }
  ]

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    const token = localStorage.getItem('token')
    if (!token) {
      this.router.navigate(['/login'])
      return
    }

    const payload = JSON.parse(atob(token.split('.')[1]))
    this.userName = payload.email
  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }

selectPlan(planId: string) {
  if (planId === 'free' || planId === this.userPlan) return

  const token = localStorage.getItem('token')
  const payload = JSON.parse(atob(token!.split('.')[1]))
  const userId = payload.id

  this.authService.createCheckout(planId, userId).subscribe({
    next: (response) => {
      window.location.href = response.url
    },
    error: (error) => {
      console.error('Erro ao criar checkout:', error)
    }
  })
}
}
