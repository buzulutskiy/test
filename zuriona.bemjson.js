module.exports = {
	block: 'page',
	title: 'Питомник Зуриона',
	favicon: '/favicon.ico',
	lang: 'ru',
	head: [
		{ elem: 'meta', attrs: { name: 'description', content: '' } },
		{ elem: 'meta', attrs: { name: 'viewport', content: 'width=device-width, initial-scale=1' } },
		{ elem: 'css', url: 'zuriona.min.css' }
	],
	scripts: [
		{ elem: 'js', url: 'zuriona.min.js' }
	],
	mods: { theme: 'islands' },
	mix: [
		{
			block: 'theme',
			mods: { color: 'whitepaper-inverse', space: 'default', size: 'default', gap: 'small', menu: 'default', font: 'museo' }
		},
		{
			block: 'component',
			mods: { whitepaper: 'default' }
		}
	],
	content: [
		{
			block: 'tpl-layout',
			attrs: { style: 'background: #000000; ' },

			content: [
				{
					block: 'menu-zuriona',
					attrs: { style: 'postion:relative' },
				},
				{
					elem: 'section',
					content: [
						{
							elem: 'container',
							elemMods: { align: 'center' },
							attrs: { style: 'width:1024px;' },
							content: [
								{
									block: 'text',
									mix: { block: 'headline', mods: { size: 'l' } },
									mods: { size: 'xxxxl', view: 'primary', align: 'left' },
									content: 'Продаем великолепных щенков пиренейской горной собаки',
								}
							]
						}
					]
				},
				{
					elem: 'section',
					content: [
						{
							elem: 'container',
							elemMods: { align: 'center' },
							attrs: { style: ' overflow:hidden; background-size: 100%;' },
							content: [
								{
									block: 'image',
									width: '100%',
									url: 'https://pp.userapi.com/c850036/v850036960/77764/RGOriOgr9GY.jpg'
								}
							]
						}
					]

				},
				{
					elem: 'section',
					content: [
						{
							elem: 'container',
							elemMods: { align: 'center' },
							attrs: { style: 'width:1024px;' },
							content: [
								{
									block: 'text',
									mix: { block: 'headline', mods: { size: 's' } },
									mods: { size: 'xxxl', view: 'primary', align: 'left' },
									content: 'Родились 12 июля и соотвествуют стандарту породы: с барсучьими отметинами, массивным костями, густой шерстью, объемным корпусом.',
								}
							]
						}
					]
				},
				{
					elem: 'section',
					mix: { block: 'decorator', mods: { 'space-t': 'xxxxl', 'space-b': 'xxxxxxl' } },
					content: [
						{
							elem: 'container',
							elemMods: { align: 'center' },

							attrs: { style: 'width:1024px;' },
							content: [
								{
									block: 'tpl-grid',
									mods: { columns: '12', 'col-gap': 'full', 'row-gap': 'full' },
									content: [
										{
											elem: 'fraction',
											elemMods: { col: '4' },
											content: [
												{
													block: 'pyrenees',
													mix: { block: 'pt-card' },
													content: [
														{
															elem: 'image',
															content: [
																{
																	block: 'image',
																	width: '100%',
																	url: 'https://sun6-4.userapi.com/c830708/v830708363/191dbe/gCU93xykyZ8.jpg'
																}
															]
														},
														{
															elem: 'footer',
															mix: { block: 'decorator', mods: { 'indent-t': 'xl', 'indent-b': 'xxxxxl' } },
															content: [
																{
																	block: 'text',
																	mods: { view: 'secondary', size: 'l', align: 'left' },
																	content: 'Девочка'
																},
																{
																	block: 'text',
																	mix: { block: 'pyrenees', elem: 'link' },
																	mods: { view: 'primary', size: 'xxxl', align: 'left', font: 'Baskerville' },
																	content: 'Чарис Грейт'
																},

															]
														},
													]
												}
											]
										},
										{
											elem: 'fraction',
											elemMods: { col: '4' },
											content: [
												{
													block: 'pyrenees',
													mix: { block: 'pt-card' },
													content: [
														{
															elem: 'image',
															content: [
																{
																	block: 'image',
																	width: '100%',
																	url: 'https://pp.userapi.com/c850036/v850036127/78a09/0ki7b0H1cew.jpg'
																}
															]
														},
														{
															elem: 'footer',
															mix: { block: 'decorator', mods: { 'indent-t': 'xl', 'indent-b': 'xxxxl' } },
															content: [
																{
																	block: 'text',
																	mods: { view: 'secondary', size: 'l', align: 'left' },
																	content: 'Девочка'
																},
																{
																	block: 'text',
																	mix: { block: 'pyrenees', elem: 'link' },
																	mods: { view: 'primary', size: 'xxxl', align: 'left', font: 'Baskerville' },
																	content: 'Чарити Годес'
																},

															]
														},
													]
												}
											]
										},
										{
											elem: 'fraction',
											elemMods: { col: '4' },
											content: [
												{
													block: 'pyrenees',
													mix: { block: 'pt-card' },
													content: [
														{
															elem: 'image',
															content: [
																{
																	block: 'image',
																	width: '100%',
																	url: 'https://pp.userapi.com/c850036/v850036127/78a10/9mkulUMLlQ8.jpg'
																}
															]
														},
														{
															elem: 'footer',
															mix: { block: 'decorator', mods: { 'indent-t': 'xl', 'indent-b': 'xxl' } },
															content: [
																{
																	block: 'text',
																	mods: { view: 'secondary', size: 'l', align: 'left' },
																	content: 'Мальчик'
																},
																{
																	block: 'text',
																	mix: { block: 'pyrenees', elem: 'link' },
																	mods: { view: 'primary', size: 'xxxl', align: 'left', font: 'Baskerville' },
																	content: 'Чан Джентли'
																},

															]
														},
													]
												}
											]
										}
									]
								},
								{
									block: 'tpl-grid',
									mods: { columns: '12', 'col-gap': 'full', 'row-gap': 'full' },
									content: [
										{
											elem: 'fraction',
											elemMods: { col: '4' },
											content: [
												{
													block: 'pyrenees',
													mix: { block: 'pt-card' },
													content: [
														{
															elem: 'image',
															content: [
																{
																	block: 'image',
																	width: '100%',
																	url: 'https://pp.userapi.com/c850036/v850036127/78a25/I2CsuAmZOc0.jpg'
																}
															]
														},
														{
															elem: 'footer',
															mix: { block: 'decorator', mods: { 'indent-t': 'xl', 'indent-b': 'xxl' } },
															content: [
																{
																	block: 'text',
																	mods: { view: 'secondary', size: 'l', align: 'left' },
																	content: 'Мальчик'
																},
																{
																	block: 'text',
																	mix: { block: 'pyrenees', elem: 'link' },
																	mods: { view: 'primary', size: 'xxxl', align: 'left', font: 'Baskerville' },
																	content: 'Чарли Лаки Стар'
																},

															]
														},
													]
												}
											]
										},
										{
											elem: 'fraction',
											elemMods: { col: '4' },
											content: [
												{
													block: 'pyrenees',
													mix: { block: 'pt-card' },
													content: [
														{
															elem: 'image',
															content: [
																{
																	block: 'image',
																	width: '100%',
																	url: 'https://pp.userapi.com/c850036/v850036127/78a1e/mByxXLh9JKE.jpg'
																}
															]
														},
														{
															elem: 'footer',
															mix: { block: 'decorator', mods: { 'indent-t': 'xxl', 'indent-b': 'xxl' } },
															content: [
																{
																	block: 'text',
																	mods: { view: 'secondary', size: 'l', align: 'left' },
																	content: 'Мальчик'
																},
																{
																	block: 'text',
																	mix: { block: 'pyrenees', elem: 'link' },
																	mods: { view: 'primary', size: 'xxxl', align: 'left', font: 'Baskerville' },
																	content: 'Честер Виннер'
																},

															]
														},
													]
												}
											]
										},
										{
											elem: 'fraction',
											elemMods: { col: '4' },
											content: [
												{
													block: 'pyrenees',
													mix: { block: 'pt-card' },
													content: [
														{
															elem: 'image',
															content: [
																{
																	block: 'image',
																	width: '100%',
																	url: 'https://pp.userapi.com/c850036/v850036127/78a17/-ZpxZ8okAM4.jpg'
																}
															]
														},
														{
															elem: 'footer',
															mix: { block: 'decorator', mods: { 'indent-t': 'xl', 'indent-b': 'xxl' } },
															content: [
																{
																	block: 'text',
																	mods: { view: 'secondary', size: 'l', align: 'left' },
																	content: 'Мальчик'
																},
																{
																	block: 'text',
																	mix: { block: 'pyrenees', elem: 'link' },
																	mods: { view: 'primary', size: 'xxxl', align: 'left', font: 'Baskerville' },
																	content: 'Черрути'
																},

															]
														},
													]
												}
											]
										}
									]
								}
							]
						}
					]
				},

				// Статьи 
				{
					elem: 'section',
					mix: { block: 'section' },
					content: [
						{
							elem: 'container',
							elemMods: { align: 'center' },
							attrs: { style: 'width:1024px;' },
							content: [
								{
									block: 'text',
									mix: [{ block: 'headline' },
										  { block: 'decorator', mods: { 'space-b': 'xxl' } }],
									mods: { size: 'xxxxl', view: 'primary', align: 'left' },
									
									content: 'О породе',
								},
								
								{
									block: 'tpl-grid',
									mods: { columns: '12', 'col-gap': 'half', 'row-gap': 'half' },
									content: [
										{
											elem: 'fraction',
											elemMods: { col: '12' },
											content: [
												{
													block: 'digital-item',
													mix: { block: 'pt-card', mods: { view: 'default' }},
													
													content: [
														{
															elem: 'info',
															mix: { block: 'pt-card', elem: 'footer', elemMods: { align:'top'} },
															content: [
																{
																	elem: 'wrap-video',
																	content: [
																		{
																			elem: 'icon-wrapper',
																			content: [
																				{
																					block: 'icon',
																					mods: { name: 'play', size: 'm', view:'primary' },
								
																				}
																			]
																		},
																		{
																			block: 'text',
																			mods: { view: 'primary', size: 'xxl', align: 'center' },
																			mix: [{ block: 'headline' },
																			{ block: 'decorator', mods: { 'space-b': 'xxs' } }],

																			content: 'Интересные факты о пиренеях'
																		},
																		

																	]
																}
															]
														},
														
														{
															elem: 'cover',
															mix: { block: 'pt-card', elem: 'content' },
															content: [
																{
																	block: 'image',
																	mix: { block: 'pt-card', elem: 'image', elemMods: { size: 'cover' } },
																	url: 'https://pp.userapi.com/c852016/v852016002/4346/QQ31k_Aj1-A.jpg'
																}
															]
														},
													]
												}


											]
										},
									
										{
											elem: 'fraction',
											elemMods: { col: '4' },
											content: [
												{
													block: 'digital-item',
													mix: { block: 'pt-card', mods: { view: 'default' }},
													
													content: [
														{
															elem: 'info',
															mix: { block: 'pt-card', elem: 'footer', elemMods: { 'space-a': 'xxl' } },
															content: [
																{
																	elem: 'wrap',
																	content: [
																		{
																			block: 'text',
																			mods: { view: 'primary', size: 'xxl', align: 'center' },
																			mix: [{ block: 'headline' },
																			{ block: 'decorator', mods: { 'space-b': 'xxs' } }],

																			content: 'История породы'
																		},
																		{
																			block: 'text',
																			mods: { view: 'secondary', size: 'm', align: 'center' },
																			content: 'Где она была выведена и почему была королевской собакой'
																		},

																	]
																}
															]
														},
														
														{
															elem: 'cover',
															mix: { block: 'pt-card', elem: 'content' },
															content: [
																{
																	block: 'image',
																	mix: { block: 'pt-card', elem: 'image', elemMods: { size: 'cover' } },
																	url: 'https://pp.userapi.com/c846420/v846420096/e716c/UMHF3EvK7ww.jpg'
																}
															]
														},
													]
												}


											]
										},
									
										
										{
											elem: 'fraction',
											elemMods: { col: '4' },

											content: [
												{
													block: 'article-preview',
													mods: { height: 'm' },
													mix: { block: 'pt-card' },
													content: [
														{
															elem: 'footer-wrapper',
															mix: { block: 'pt-card', elem: 'footer', elemMods: { 'space-a': 'xxl' } },
															content: [
																{
																	elem: 'footer',
																	content: [
																		{
																			block: 'text',
																			mods: { view: 'primary', size: 'xxl', align: 'center' },
																			mix: [{ block: 'headline' },
																			{ block: 'decorator', mods: { 'space-b': 'xxs' } }],
																			content: 'Как выбрать щенка'
																		},
																		{
																			block: 'text',
																			mods: { view: 'primary', size: 'm', align: 'center' },
																			content: 'На что следует обращать внимание в первую очередь'
																		},

																	]
																}
															]
														},
														{
															block: 'image',
															mix: { block: 'pt-card', elem: 'image', elemMods: { size: 'cover' } },
															url: 'https://pp.userapi.com/c852124/v852124183/3bee/aqNW95Bp34Y.jpg'
														}
													]
												}


											]
										},
										{
											elem: 'fraction',
											elemMods: { col: '4' },
											content: [
												{
													block: 'digital-item',
													mix: { block: 'pt-card', mods: { view: 'default' }},
													
													content: [
														{
															elem: 'info',
															mix: { block: 'pt-card', elem: 'footer', elemMods: { 'space-a': 'xxl' } },
															content: [
																{
																	elem: 'wrap',
																	content: [
																		{
																			block: 'text',
																			mods: { view: 'primary', size: 'xxl', align: 'center' },
																			mix: [{ block: 'headline' },
																			{ block: 'decorator', mods: { 'space-b': 'xxs' } }],

																			content: 'Пинерейский характер'
																		},
																		{
																			block: 'text',
																			mods: { view: 'secondary', size: 'm', align: 'center' },
																			content: 'Особенности характера и дрессировки'
																		},

																	]
																}
															]
														},
														
														{
															elem: 'cover',
															mix: { block: 'pt-card', elem: 'content' },
															content: [
																{
																	block: 'image',
																	mix: { block: 'pt-card', elem: 'image', elemMods: { size: 'cover' } },
																	url: 'https://pp.userapi.com/c852124/v852124183/3be7/6mRBs8HRrf0.jpg'
																}
															]
														},
													]
												}


											]
										},
										
									]
								},

							]

						}
					]
				},

				// Отзывы 
				{
					elem: 'section',
					mix: { block: 'section' },
					content: [
						{
							elem: 'container',
							elemMods: { align: 'center' },
							attrs: { style: 'width:1024px;' },
							content: [
								{
									block: 'text',
									mix: [{ block: 'headline' },
										  { block: 'decorator', mods: { 'space-b': 'xxl' } }],
									mods: { size: 'xxxxl', view: 'primary', align: 'left' },
									
									content: 'Отзывы',
								},
								{
									block: 'comment',
									mix: { block: 'pt-card', mods: { view: 'default' }},
									content: [
										{
											elem: 'content',
											mix: [{ block: 'pt-card', elem:'content'},
											{ block: 'decorator', mods: { 'indent-a': 'xxxl' } },],
											content: [
												{
													block: 'text',
													mods: { view: 'primary', size: 'xxl', align: 'left' },
													mix: [{ block: 'headline' },
										  			{ block: 'decorator', mods: { 'space-b': 'xs' } }],
													content: 'Дмитрий Гусев, Калуга'

												},

												{
													block: 'text',
													mods: { view: 'primary', size: 'm', align: 'left' },
												
													content: 'Дамир как будто родился в нашем доме, так быстро привык и со всеми нашел общий язык. Умный и добрый парень растёт. По сравнению с нашим бурят-монгольским волкодавом Дамир гораздо сообразительнее и послушнее. Как человек все пониимает. И все время старается быть рядом с нами, я очень им доволен, отличный пес. Вся семья его очень любит.'
												},
												
												
												
											]
											
										},
										{
											elem: 'link',
											mix: { block: 'decorator', mods: { 'indent-a': 'xxl' } },
											content: [
												{
													block: 'text',
													content: 'Фейсбук'
												}
											]
										},
										{
											elem: 'cover',
											mix: { block: 'pt-card', elem: 'content' },
											content: [
												{
													block: 'image',
													mix: { block: 'pt-card', elem: 'image', elemMods: { size: 'cover' } },
													url: 'https://pp.userapi.com/c846218/v846218328/f8c2f/TsH0eBt3W3g.jpg'
												}
											]
										},
									
									
									]
								
								},
									
								{
									block: 'paging',
									
									content: [
										{
											elem: 'circle',
											
										},
										{
											elem: 'circle',
											attrs: {style:'opacity:0.5'}
										},
										{
											elem: 'circle',
											attrs: {style:'opacity:0.5'}
										},
										{
											elem: 'circle',
											attrs: {style:'opacity:0.5'}
										},
										{
											elem: 'circle',
											attrs: {style:'opacity:0.5'}
										},
										{
											elem: 'circle',
											attrs: {style:'opacity:0.5'}
										},
									]
								}
								
							]

						}
					]
				},

				// Популярные вопросы 
				{
						elem: 'section',
						mix: { block: 'section' },
						content: [
							{
								elem: 'container',
								elemMods: { align: 'center' },
								attrs: { style: 'width:1024px;' },
								content: [
									{
										block: 'text',
										mix: [{ block: 'headline' },
											  { block: 'decorator', mods: { 'space-b': 'xxl' } }],
										mods: { size: 'xxxxl', view: 'primary', align: 'left' },	
										content: 'Популярные вопросы',
									},
									{
										elem: 'container',
										content: [
											{
												block: 'question',
												mods: { state: 'open' },
												mix: { block: 'pt-card' },
	
												content: [
													{
														elem: 'footer',

														content: [
															{
																block: 'text',
																mix: [{ block: 'headline' },
																	{ block: 'decorator', mods: { 'space-b': 'xxs' } }],
																mods: { view: 'primary', size: 'xxl', weight: 'semibold', align: 'left' },
																content: 'Агрессивны ли пиренейцы?'
															},

															{
																elem: 'paragraph',
																attrs: { style: 'width:900px;' },
																content: [
																	{
																		block: 'text',
																		mix: { block: 'decorator', mods: { 'space-b': 'xxs' } },
																		mods: { view: 'primary', size: 'm', weight: 'semibold', align: 'left' },
																		content: 'Согласно официальному стандарту породы, агрессивность считается пороком, и такие собаки подлежат выбраковке.'
																	},
																	{
																		block: 'text',
																		mods: { view: 'primary', size: 'm', weight: 'semibold', align: 'left' },
																		mix: { block: 'decorator', mods: { 'space-b': 'xxs' } },
																		content: 'В Северо-Западном регионе России в последние несколько лет сложилось поголовье пиренейских горных собак с серьёзными отклонениями в поведении. От их владельцев нарастает поток жалоб на опасное поведение собак, это очень тревожно. Будьте внимательны, приобретая щенка в питерских питомниках.'
																	},
																	{
																		block: 'text',
																		mods: { view: 'primary', size: 'm', weight: 'semibold', align: 'left' },
																		content: 'Обращайте внимание на выражение глаз, которое напрямую связано с характером собаки. Если нет правильного "пиренейского выражения", то и пиренейского поведения ждать не стоит. Настоящие представители породы - добрые собаки, они сторожат только на своей территории, а за пределами участка ведут себя нейтрально по отношению к людям и животным.'
																	}
																]

															}
														]
													}
												]
											},
											{
												block: 'question',
												mods: { state: 'closed' },
												mix: { block: 'pt-card' },
												content: [
													{
														elem: 'footer',
														content: [
															{
																block:'text',
																mix: [{ block: 'headline' },
																	{ block: 'decorator', mods: { 'space-b': 'xxs' } }],
																mods: { view: 'primary', size: 'xxl', weight: 'semibold', align: 'left' },
																content: 'Порода не опасна для детей?'
															},
														]
													}
												]
											},
											{
												block: 'question',
												mods: { state: 'closed' },
												mix: { block: 'pt-card' },
												content: [
													{
														elem: 'footer',
														content: [
															{
																block:'text',
																mix: [{ block: 'headline' },
																	{ block: 'decorator', mods: { 'space-b': 'xxs' } }],
																mods: { view: 'primary', size: 'xxl', weight: 'semibold', align: 'left' },
																content: 'Почему пиренейской собаке нельзя жить в квартире?'
															},
														]
													}
												]
											},
											{
												block: 'question',
												mods: { state: 'closed' },
												mix: { block: 'pt-card' },
	
												content: [
													{
														elem: 'footer',
														content: [
															{
																block:'text',
																mix: [{ block: 'headline' },
																	{ block: 'decorator', mods: { 'space-b': 'xxs' } }],
																mods: { view: 'primary', size: 'xxl', weight: 'semibold', align: 'left' },
																content: 'Чем?'
															},
														]
													}
												]
											},
											
											{
												block: 'question',
												mods: { state: 'closed' },
												mix: { block: 'pt-card' },
												content: [
													{
														elem: 'footer',
														content: [
															{
																block:'text',
																mix: [{ block: 'headline' },
																	{ block: 'decorator', mods: { 'space-b': 'xxs' } }],
																mods: { view: 'primary', size: 'xxl', weight: 'semibold', align: 'left' },
																content: 'Как купить щенка?'
															},
														]
													}
												]
											},
										]
									},
								]
	
							}
						]
				},

				
				
			]
		},
	]
};