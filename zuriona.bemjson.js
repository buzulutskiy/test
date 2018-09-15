module.exports = {
	block: 'page',
	title: 'BEM DESIGN',
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
					mix: { block: 'news' },
					content: [
						{
							elem: 'container',
							elemMods: { align: 'center' },
							attrs: { style: 'width:1024px;' },
							content: [
								{
									block: 'text',
									mix: { block: 'headline', mods: { size: 's' } },
									mods: { size: 'xxxxl', view: 'primary', align: 'left' },
									content: 'О породе',
								},
								{
									block: 'article-preview',
													mods: { height: 's' },
													mix: [
														{ block: 'theme', mods: { color: 'whitepaper-inverse' } },
														{ block: 'component', mods: { whitepaper: 'inverse' } },
														{ block: 'pt-card' }
													],
									content: [
										{
											elem: 'footer-wrapper',
											mix: { block: 'pt-card', elem: 'footer', elemMods: { 'space-a': 'xxl' } },
											content: [
												/*{
													elem: 'footer',
													content: [
														{
															block: 'text',
															mods: { view: 'primary', size: 'xxxl', align: 'center' },
															mix: [{ block: 'headline' },
																  { block: 'decorator', mods: { 'space-b': 'xxs' } }],
															content: 'История породы'
														},
													]
												
												},*/
												{
													block: 'text',
									mix: { block: 'headline' },
									mods: { size: 'xxxxl', view: 'primary', align: 'center' },
									content: 'О породе',
												}
											]
										},
										{
											block: 'image',
											mix: { block: 'pt-card', elem: 'image', elemMods: { size: 'cover' } },
											url: 'https://pp.userapi.com/c850036/v850036127/78a85/yMCCUBB7aEU.jpg'
										}
									]
								},
								{
									block: 'tpl-grid',
									mods: { columns: '12', 'col-gap': 'half', 'row-gap': 'full' },
									content: [
										{
											elem: 'fraction',
											elemMods: { col: '4' },
											content: [
												{
													block: 'article-preview',
													mods: { height: 'm' },
													mix: [
														{ block: 'theme', mods: { color: 'whitepaper-inverse' } },
														{ block: 'component', mods: { whitepaper: 'inverse' } },
														{ block: 'pt-card' }
													],
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

																			content: 'История породы'
																		},
																		{
																			block: 'text',
																			mods: { view: 'primary', size: 'm', align: 'center' },
																			content: 'Где она была выведена и почему была королевской собакой'
																		},

																	]
																}
															]
														},
														{
															block: 'image',
															mix: { block: 'pt-card', elem: 'image', elemMods: { size: 'cover' } },
															url: 'https://pp.userapi.com/c846420/v846420096/e716c/UMHF3EvK7ww.jpg'
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
																			content: 'Пинерейский характер'
																		},
																		{
																			block: 'text',
																			mods: { view: 'primary', size: 'm', align: 'center' },
																			content: 'Особенности характера и дрессировки'
																		},

																	]
																}
															]
														},
														{
															block: 'image',
															mix: { block: 'pt-card', elem: 'image', elemMods: { size: 'cover' } },
															url: 'https://pp.userapi.com/c852124/v852124183/3be7/6mRBs8HRrf0.jpg'
														}
													]
												}


											]
										}
									]
								},
							
							]

						}
					]
				},

				// Инстаграмм
				{
					elem: 'section',
					mix: { block: 'news' },
					content: [
						{
							elem: 'container',
							elemMods: { align: 'center' },
							attrs: { style: 'width:1024px;' },
							content: [
								{
									block: 'heading',
									content: [
										{
											block: 'text',
											mix: { block: 'news', elem: 'heading'},
											content: 'Счастливые хозяева',
										}
									]


								},
								{
									block: 'tpl-grid',
									mods: { columns: '12', 'col-gap': 'half', 'row-gap': 'full' },
									content: [
										{
											elem: 'fraction',
											elemMods: { col: '3' },
											content: [
												{
													block: 'instagram',
													mix: [
														{ block: 'theme', },
														{ block: 'component', },
														{ block: 'pt-card' }
													],
													content: [
														{
															elem: 'footer-wrapper',
															mix: { block: 'pt-card', elem: 'footer' },
															content: [
																{
																	elem: 'footer',
																	content: [
																		{
																			block: 'pt-icon-plus',
																			mods: { 'vertical-align': 'center' },
																			content: [
																				{
																					elem: 'icon',
																					elemMods: { 'indent-r': 's' },
																					content: [
																						{
																							block: 'avatar',
																							content: [
																								{
																									elem: 'photo',
																									elemMods: { size: 's' },
																									content: [
																										{
																											block: 'image',
																											mix: { block: 'pt-card', elem: 'image', },
																											url: 'https://pp.userapi.com/c830208/v830208641/191b03/rOdFpMxWhu4.jpg'
																										}
																									]
																								}
																							]
																						}
																					]
																				},
																				{
																					elem: 'block',
																					content: [
																						{
																							block: 'text',
																							mods: { size: 's', view: 'primary' },
																							mix: { block: 'decorator', mods: { 'space-b': 'xs' } },
																							content: "@queenmarkers"
																						},
																					]
																				}
																			]
																		}

																	]
																}
															]
														},
														{
															block: 'image',
															mix: { block: 'pt-card', elem: 'image', },
															url: 'https://pp.userapi.com/c830208/v830208641/191ae9/xQ8YoE1TARo.jpg'
														}
													]
												}
											]
										},
										{
											elem: 'fraction',
											elemMods: { col: '3' },
											content: [
												{
													block: 'instagram',
													mix: [
														{ block: 'theme', },
														{ block: 'component', },
														{ block: 'pt-card' }
													],
													content: [
														{
															elem: 'footer-wrapper',
															mix: { block: 'pt-card', elem: 'footer' },
															content: [
																{
																	elem: 'footer',
																	content: [
																		{
																			block: 'pt-icon-plus',
																			mods: { 'vertical-align': 'center' },
																			content: [
																				{
																					elem: 'icon',
																					elemMods: { 'indent-r': 's' },
																					content: [
																						{
																							block: 'avatar',
																							content: [
																								{
																									elem: 'photo',
																									elemMods: { size: 's' },
																									content: [
																										{
																											block: 'image',
																											mix: { block: 'pt-card', elem: 'image', },
																											url: 'https://pp.userapi.com/c830208/v830208641/191b03/rOdFpMxWhu4.jpg'
																										}
																									]
																								}
																							]
																						}
																					]
																				},
																				{
																					elem: 'block',
																					content: [
																						{
																							block: 'text',
																							mods: { size: 's', view: 'primary' },
																							mix: { block: 'decorator', mods: { 'space-b': 'xs' } },
																							content: "@queenmarkers"
																						},
																					]
																				}
																			]
																		}

																	]
																}
															]
														},
														{
															block: 'image',
															mix: { block: 'pt-card', elem: 'image', },
															url: 'https://pp.userapi.com/c830208/v830208641/191ae9/xQ8YoE1TARo.jpg'
														}
													]
												}
											]
										},
										{
											elem: 'fraction',
											elemMods: { col: '3' },
											content: [
												{
													block: 'instagram',
													mix: [
														{ block: 'theme', },
														{ block: 'component', },
														{ block: 'pt-card' }
													],
													content: [
														{
															elem: 'footer-wrapper',
															mix: { block: 'pt-card', elem: 'footer' },
															content: [
																{
																	elem: 'footer',
																	content: [
																		{
																			block: 'pt-icon-plus',
																			mods: { 'vertical-align': 'center' },
																			content: [
																				{
																					elem: 'icon',
																					elemMods: { 'indent-r': 's' },
																					content: [
																						{
																							block: 'avatar',
																							content: [
																								{
																									elem: 'photo',
																									elemMods: { size: 's' },
																									content: [
																										{
																											block: 'image',
																											mix: { block: 'pt-card', elem: 'image', },
																											url: 'https://pp.userapi.com/c830208/v830208641/191b03/rOdFpMxWhu4.jpg'
																										}
																									]
																								}
																							]
																						}
																					]
																				},
																				{
																					elem: 'block',
																					content: [
																						{
																							block: 'text',
																							mods: { size: 's', view: 'primary' },
																							mix: { block: 'decorator', mods: { 'space-b': 'xs' } },
																							content: "@queenmarkers"
																						},
																					]
																				}
																			]
																		}

																	]
																}
															]
														},
														{
															block: 'image',
															mix: { block: 'pt-card', elem: 'image', },
															url: 'https://pp.userapi.com/c830208/v830208641/191ae9/xQ8YoE1TARo.jpg'
														}
													]
												}
											]
										},
										{
											elem: 'fraction',
											elemMods: { col: '3' },
											content: [
												{
													block: 'instagram',
													mix: [
														{ block: 'theme', },
														{ block: 'component', },
														{ block: 'pt-card' }
													],
													content: [
														{
															elem: 'footer-wrapper',
															mix: { block: 'pt-card', elem: 'footer' },
															content: [
																{
																	elem: 'footer',
																	content: [
																		{
																			block: 'pt-icon-plus',
																			mods: { 'vertical-align': 'center' },
																			content: [
																				{
																					elem: 'icon',
																					elemMods: { 'indent-r': 's' },
																					content: [
																						{
																							block: 'avatar',
																							content: [
																								{
																									elem: 'photo',
																									elemMods: { size: 's' },
																									content: [
																										{
																											block: 'image',
																											mix: { block: 'pt-card', elem: 'image', },
																											url: 'https://pp.userapi.com/c830208/v830208641/191b03/rOdFpMxWhu4.jpg'
																										}
																									]
																								}
																							]
																						}
																					]
																				},
																				{
																					elem: 'block',
																					content: [
																						{
																							block: 'text',
																							mods: { size: 's', view: 'primary' },
																							mix: { block: 'decorator', mods: { 'space-b': 'xs' } },
																							content: "@queenmarkers"
																						},
																					]
																				}
																			]
																		}

																	]
																}
															]
														},
														{
															block: 'image',
															mix: { block: 'pt-card', elem: 'image', },
															url: 'https://pp.userapi.com/c830208/v830208641/191ae9/xQ8YoE1TARo.jpg'
														}
													]
												}
											]
										},

									]
								}


							]

						}
					]
				},

				// Вопросы
				{
					elem: 'section',
					mix: { block: 'news' },
					content: [
						{
							elem: 'container',
							elemMods: { align: 'center' },
							attrs: { style: 'width:1024px;' },
							content: [
								{
									block: 'text',
									mix: { block: 'news', elem: 'heading' },
									content: 'Популярные вопросы',
								},

								{
									elem: 'container',
									content: [
										{
											block: 'question',
											mods: { state: 'close' },
											mix: { block: 'pt-card' },

											content: [
												{
													content: [
														{
															elem: 'footer',

															content: [
																{
																	block: 'text',
																	mods: { view: 'primary', size: 'xl', weight: 'semibold', align: 'left' },
																	content: 'Как заказать щенка'
																},

																{
																	elem: 'paragraph',
																	attrs: { style: 'width:900px;' },
																	content: [
																		{
																			block: 'text',
																			mods: { view: 'primary', size: 'm', weight: 'semibold', align: 'left' },
																			content: 'Согласно официальному стандарту породы, агрессивность считается пороком, и такие собаки подлежат выбраковке.'
																		},
																		{
																			block: 'text',
																			mods: { view: 'primary', size: 'm', weight: 'semibold', align: 'left' },
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


											]
										},
										{
											block: 'question',
											mods: { state: 'close' },
											mix: { block: 'pt-card' },

											content: [
												{
													content: [
														{
															elem: 'footer',

															content: [
																{
																	block: 'text',
																	mods: { view: 'primary', size: 'xl', weight: 'semibold', align: 'left' },
																	content: 'Как заказать щенка'
																},
															]
														}
													]
												},


											]
										},
										{
											block: 'question',
											mods: { state: 'close' },
											mix: { block: 'pt-card' },

											content: [
												{
													content: [
														{
															elem: 'footer',

															content: [
																{
																	block: 'text',
																	mods: { view: 'primary', size: 'xl', weight: 'semibold', align: 'left' },
																	content: 'Как заказать щенка'
																},
															]
														}
													]
												},


											]
										},
										{
											block: 'question',
											mods: { state: 'close' },
											mix: { block: 'pt-card' },

											content: [
												{
													content: [
														{
															elem: 'footer',

															content: [
																{
																	block: 'text',
																	mods: { view: 'primary', size: 'xl', weight: 'semibold', align: 'left' },
																	content: 'Как заказать щенка'
																},
															]
														}
													]
												},


											]
										},
										{
											block: 'question',
											mods: { state: 'close' },
											mix: { block: 'pt-card' },

											content: [
												{
													content: [
														{
															elem: 'footer',

															content: [
																{
																	block: 'text',
																	mods: { view: 'primary', size: 'xl', weight: 'semibold', align: 'left' },
																	content: 'Как заказать щенка'
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

						}
					]
				},

				{
					elem: 'section',
					content: [
						{
							elem: 'container',
							elemMods: { size: 'm', align: 'center' },
							content: [
								{
									elem: 'content',
									attrs: { style: 'display: inline-block;position: relative;left: 50%;transform: translateX(-50%);' },
									content: [
										{
											block: 'pyrenees',
											content: [
												{
													elem: 'photo',
													elemMods: { size: 'l' },
													content: [
														{
															block: 'image',
															url: 'https://pp.userapi.com/c850036/v850036807/7495f/axERfVn2JpE.jpg'
														}]
												},
												{
													elem: 'container',
													elemMods: { align: 'center' },
													content: [
														{
															block: 'text',
															attrs: { style: 'font-size:10px' },
															mods: { view: 'primary', align: 'center', transform: 'uppercase', weight: 'bold' },
															content: "Отец"
														},
														{
															block: 'text',
															mods: { size: 'xl', align: 'center', weight: 'semibold' },
															content: "Атлант"
														},
														{
															block: 'text',
															mods: { size: 'm', align: 'center', view: 'ghost' },
															content: "Чемпион России"
														}
													]
												}
											]
										},
										{
											block: 'pyrenees',
											content: [
												{
													elem: 'photo',
													elemMods: { size: 'l' },
													content: [
														{
															block: 'image',
															url: 'https://pp.userapi.com/c850036/v850036807/74958/tLM_Z_dRFpI.jpg'
														}]
												},
												{
													elem: 'container',
													content: [
														{
															block: 'text',
															attrs: { style: 'font-size:10px' },
															mods: { view: 'primary', align: 'center', transform: 'uppercase', weight: 'bold' },
															content: "Мать"
														},
														{
															block: 'text',
															mods: { size: 'xl', align: 'center', weight: 'semibold' },
															content: "Глория"
														},
														{
															block: 'text',
															mods: { size: 'm', align: 'center', view: 'ghost' },
															content: "Чемпион России"
														}
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
				{
					elem: 'section',
					content: [
						{
							elem: 'container',
							attrs: { style: 'padding: 64px 0; width: 547px;' },
							elemMods: { size: 'xs', align: 'center' },
							content: [
								{
									block: 'text',
									mods: { size: 'xl', view: 'primary', align: 'center', },
									content: 'Щенки родились 12 июля и соотвествуют стандарту породы: с барсучьими отметинами, массивным костями, густой шерстью, объемным корпусом.',
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
							elemMods: { size: 'm', align: 'center' },




							content: [
								{
									elem: 'content',
									attrs: { style: 'display: inline-block;position: relative;left: 50%;transform: translateX(-50%);' },
									content: [
										{
											block: 'pyrenees',
											content: [
												{
													elem: 'photo',
													elemMods: { size: 'm' },
													content: [
														{
															block: 'image',
															url: 'https://pp.userapi.com/c850036/v850036807/7495f/axERfVn2JpE.jpg'
														}]
												},
												{
													elem: 'container',
													elemMods: { align: 'center' },
													content: [

														{
															block: 'text',
															mods: { size: 'm', align: 'center', view: 'ghost' },
															content: "Чемпион России"
														}
													]
												}
											]
										},
										{
											block: 'pyrenees',
											content: [
												{
													elem: 'photo',
													elemMods: { size: 'm' },
													content: [
														{
															block: 'image',
															url: 'https://pp.userapi.com/c850036/v850036807/74958/tLM_Z_dRFpI.jpg'
														}]
												},
												{
													elem: 'container',
													content: [

														{
															block: 'text',
															mods: { size: 'm', align: 'center', view: 'ghost' },
															content: "Чемпион России"
														}
													]
												}

											]
										},
										{
											block: 'pyrenees',
											content: [
												{
													elem: 'photo',
													elemMods: { size: 'm' },
													content: [
														{
															block: 'image',
															url: 'https://pp.userapi.com/c850036/v850036807/74958/tLM_Z_dRFpI.jpg'
														}]
												},
												{
													elem: 'container',
													content: [

														{
															block: 'text',
															mods: { size: 'm', align: 'center', view: 'ghost' },
															content: "Чемпион России"
														}
													]
												}

											]
										},
										{
											block: 'pyrenees',
											content: [
												{
													elem: 'photo',
													elemMods: { size: 'm' },
													content: [
														{
															block: 'image',
															url: 'https://pp.userapi.com/c850036/v850036807/74958/tLM_Z_dRFpI.jpg'
														}]
												},
												{
													elem: 'container',
													content: [

														{
															block: 'text',
															mods: { size: 'm', align: 'center', view: 'ghost' },
															content: "Чемпион России"
														}
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
				{
					elem: 'section',
					content: [
						{
							elem: 'container',
							attrs: { style: 'padding: 64px 0; width: 443px;' },
							elemMods: { size: 'xs', align: 'center' },
							content: [
								{
									block: 'text',
									mods: { size: 'xl', view: 'primary', align: 'center', },
									content: 'Мы  с удовольствием расскажем о характерах и поможем с выбором щенка',
								},
								{
									block: 'text',
									mods: { size: 'xxxxl', view: 'primary', align: 'center', },
									content: '+ 7 909 234 24 23',
								},
								{
									block: 'social',
									content: [

									]

								}
							]
						}
					]
				},


			]
		},

		// Статьи

		{
			block: 'tpl-layout',
			content: [
				{
					elem: 'section',
					mix: { block: 'decorator', mods: { 'space-t': 'xxxxxxl' } },

					content: [
						{
							elem: 'container',
							elemMods: { align: 'center' },
							attrs: {
								'style': 'width: 1008px;'
							},
							content: [
								{
									block: 'tpl-grid',
									mods: { columns: '12', 'col-gap': 'half', 'row-gap': 'full' },
									content: [
										{
											elem: 'fraction',
											elemMods: { col: '6' },
											content: [
												{
													block: 'article-preview',
													mods: { height: 's' },
													mix: [
														{ block: 'theme', mods: { color: 'whitepaper-inverse' } },
														{ block: 'component', mods: { whitepaper: 'inverse' } },
														{ block: 'pt-card' }
													],
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
																			mods: { view: 'primary', size: 'xl', weight: 'semibold', align: 'left' },
																			content: 'Популярные факты о пинереях'
																		},

																	]
																}
															]
														},
														{
															block: 'image',
															mix: { block: 'pt-card', elem: 'image', elemMods: { size: 'cover' } },
															url: 'https://avatars.mds.yandex.net/get-pdb/199965/12a0fd5f-e89f-4c2e-b496-6a027f11fbff/orig'
														},
														{
															elem: 'play',
															content: [
																{
																	block: 'image',
																	mix: { block: 'pt-card', elem: 'play', },

																}
															]
														}
													]
												}


											]
										},

										{
											elem: 'fraction',
											elemMods: { col: '6' },
											content: [
												{
													block: 'article-preview',
													mods: { height: 's' },
													mix: [
														{ block: 'theme', mods: { color: 'whitepaper-inverse' } },
														{ block: 'component', mods: { whitepaper: 'inverse' } },
														{ block: 'pt-card' }
													],
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
																			mods: { view: 'primary', size: 'xl', weight: 'semibold', align: 'left' },
																			content: 'О питомнике'
																		},
																		{
																			block: 'text',
																			mods: { view: 'primary', size: 'm', align: 'left' },
																			content: 'Как мы выращиваем настоящих пиренеев'
																		},

																	]
																}
															]
														},
														{
															block: 'image',
															mix: { block: 'pt-card', elem: 'image', elemMods: { size: 'cover' } },
															url: 'https://pp.userapi.com/c846420/v846420096/e716c/UMHF3EvK7ww.jpg'
														}
													]
												}


											]
										},
									]
								},
								{
									block: 'tpl-grid',
									mods: { columns: '12', 'col-gap': 'half', 'row-gap': 'full' },
									content: [
										{
											elem: 'fraction',
											elemMods: { col: '4' },
											content: [
												{
													block: 'article-preview',
													mods: { height: 'm' },
													mix: [
														{ block: 'theme', mods: { color: 'whitepaper-inverse' } },
														{ block: 'component', mods: { whitepaper: 'inverse' } },
														{ block: 'pt-card' }
													],
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
																			mods: { view: 'primary', size: 'xl', weight: 'semibold', align: 'center' },
																			content: 'История породы'
																		},
																		{
																			block: 'text',
																			mods: { view: 'primary', size: 'm', align: 'center' },
																			content: 'Где она была выведена и почему была королевской собакой'
																		},

																	]
																}
															]
														},
														{
															block: 'image',
															mix: { block: 'pt-card', elem: 'image', elemMods: { size: 'cover' } },
															url: 'https://pp.userapi.com/c846420/v846420096/e716c/UMHF3EvK7ww.jpg'
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
													block: 'article-preview',
													mods: { height: 'm' },
													mix: [
														{ block: 'theme', mods: { color: 'whitepaper-inverse' } },
														{ block: 'component', mods: { whitepaper: 'inverse' } },
														{ block: 'pt-card' }
													],
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
																			mods: { view: 'primary', size: 'xl', weight: 'semibold', align: 'center' },
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
															url: 'https://pp.userapi.com/c846420/v846420096/e716c/UMHF3EvK7ww.jpg'
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
													block: 'article-preview',
													mods: { height: 'm' },
													mix: [
														{ block: 'theme', mods: { color: 'whitepaper-inverse' } },
														{ block: 'component', mods: { whitepaper: 'inverse' } },
														{ block: 'pt-card' }
													],
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
																			mods: { view: 'primary', size: 'xl', weight: 'semibold', align: 'center' },
																			content: 'Пинерейский характер'
																		},
																		{
																			block: 'text',
																			mods: { view: 'primary', size: 'm', align: 'center' },
																			content: 'Особенности характера и дрессировки'
																		},

																	]
																}
															]
														},
														{
															block: 'image',
															mix: { block: 'pt-card', elem: 'image', elemMods: { size: 'cover' } },
															url: 'https://pp.userapi.com/c846420/v846420096/e716c/UMHF3EvK7ww.jpg'
														}
													]
												}


											]
										}
									]
								}
							]

						},

						{
							block: 'link',
							content: [
								{
									block: 'text',
									content: 'Все статьи'
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
							attrs: {
								'style': 'width: 1008px;'
							},
							content: [
								{
									elem: 'container',
									attrs: { style: 'padding: 64px 0; width: 547px;' },
									elemMods: { size: 'xs', align: 'center' },
									content: [
										{
											block: 'text',
											mods: { size: 'xl', view: 'primary', align: 'center', },
											content: 'Счастливые владельцы',
										}
									]
								},
								{
									block: 'tpl-grid',
									mods: { columns: '12', 'col-gap': 'half', 'row-gap': 'full' },
									content: [
										{
											elem: 'fraction',
											elemMods: { col: '3' },
											content: [
												{
													block: 'instagram',
													mix: [
														{ block: 'theme', },
														{ block: 'component', },
														{ block: 'pt-card' }
													],
													content: [
														{
															elem: 'footer-wrapper',
															mix: { block: 'pt-card', elem: 'footer' },
															content: [
																{
																	elem: 'footer',
																	content: [
																		{
																			block: 'pt-icon-plus',
																			mods: { 'vertical-align': 'center' },
																			content: [
																				{
																					elem: 'icon',
																					elemMods: { 'indent-r': 's' },
																					content: [
																						{
																							block: 'avatar',
																							content: [
																								{
																									elem: 'photo',
																									elemMods: { size: 's' },
																									content: [
																										{
																											block: 'image',
																											mix: { block: 'pt-card', elem: 'image', },
																											url: 'https://pp.userapi.com/c830208/v830208641/191b03/rOdFpMxWhu4.jpg'
																										}
																									]
																								}
																							]
																						}
																					]
																				},
																				{
																					elem: 'block',
																					content: [
																						{
																							block: 'text',
																							mods: { size: 's', view: 'primary' },
																							mix: { block: 'decorator', mods: { 'space-b': 'xs' } },
																							content: "@queenmarkers"
																						},
																					]
																				}
																			]
																		}

																	]
																}
															]
														},
														{
															block: 'image',
															mix: { block: 'pt-card', elem: 'image', },
															url: 'https://pp.userapi.com/c830208/v830208641/191ae9/xQ8YoE1TARo.jpg'
														}
													]
												}
											]
										},
										{
											elem: 'fraction',
											elemMods: { col: '3' },
											content: [
												{
													block: 'instagram',
													mix: [
														{ block: 'theme', },
														{ block: 'component', },
														{ block: 'pt-card' }
													],
													content: [
														{
															elem: 'footer-wrapper',
															mix: { block: 'pt-card', elem: 'footer' },
															content: [
																{
																	elem: 'footer',
																	content: [
																		{
																			block: 'pt-icon-plus',
																			mods: { 'vertical-align': 'center' },
																			content: [
																				{
																					elem: 'icon',
																					elemMods: { 'indent-r': 's' },
																					content: [
																						{
																							block: 'avatar',
																							content: [
																								{
																									elem: 'photo',
																									elemMods: { size: 's' },
																									content: [
																										{
																											block: 'image',
																											mix: { block: 'pt-card', elem: 'image', },
																											url: 'https://pp.userapi.com/c830208/v830208641/191b03/rOdFpMxWhu4.jpg'
																										}
																									]
																								}
																							]
																						}
																					]
																				},
																				{
																					elem: 'block',
																					content: [
																						{
																							block: 'text',
																							mods: { size: 's', view: 'primary' },
																							mix: { block: 'decorator', mods: { 'space-b': 'xs' } },
																							content: "@queenmarkers"
																						},
																					]
																				}
																			]
																		}

																	]
																}
															]
														},
														{
															block: 'image',
															mix: { block: 'pt-card', elem: 'image', },
															url: 'https://pp.userapi.com/c830208/v830208641/191ae9/xQ8YoE1TARo.jpg'
														}
													]
												}
											]
										},
										{
											elem: 'fraction',
											elemMods: { col: '3' },
											content: [
												{
													block: 'instagram',
													mix: [
														{ block: 'theme', },
														{ block: 'component', },
														{ block: 'pt-card' }
													],
													content: [
														{
															elem: 'footer-wrapper',
															mix: { block: 'pt-card', elem: 'footer' },
															content: [
																{
																	elem: 'footer',
																	content: [
																		{
																			block: 'pt-icon-plus',
																			mods: { 'vertical-align': 'center' },
																			content: [
																				{
																					elem: 'icon',
																					elemMods: { 'indent-r': 's' },
																					content: [
																						{
																							block: 'avatar',
																							content: [
																								{
																									elem: 'photo',
																									elemMods: { size: 's' },
																									content: [
																										{
																											block: 'image',
																											mix: { block: 'pt-card', elem: 'image', },
																											url: 'https://pp.userapi.com/c830208/v830208641/191b03/rOdFpMxWhu4.jpg'
																										}
																									]
																								}
																							]
																						}
																					]
																				},
																				{
																					elem: 'block',
																					content: [
																						{
																							block: 'text',
																							mods: { size: 's', view: 'primary' },
																							mix: { block: 'decorator', mods: { 'space-b': 'xs' } },
																							content: "@queenmarkers"
																						},
																					]
																				}
																			]
																		}

																	]
																}
															]
														},
														{
															block: 'image',
															mix: { block: 'pt-card', elem: 'image', },
															url: 'https://pp.userapi.com/c830208/v830208641/191ae9/xQ8YoE1TARo.jpg'
														}
													]
												}
											]
										},
										{
											elem: 'fraction',
											elemMods: { col: '3' },
											content: [
												{
													block: 'instagram',
													mix: [
														{ block: 'theme', },
														{ block: 'component', },
														{ block: 'pt-card' }
													],
													content: [
														{
															elem: 'footer-wrapper',
															mix: { block: 'pt-card', elem: 'footer' },
															content: [
																{
																	elem: 'footer',
																	content: [
																		{
																			block: 'pt-icon-plus',
																			mods: { 'vertical-align': 'center' },
																			content: [
																				{
																					elem: 'icon',
																					elemMods: { 'indent-r': 's' },
																					content: [
																						{
																							block: 'avatar',
																							content: [
																								{
																									elem: 'photo',
																									elemMods: { size: 's' },
																									content: [
																										{
																											block: 'image',
																											mix: { block: 'pt-card', elem: 'image', },
																											url: 'https://pp.userapi.com/c830208/v830208641/191b03/rOdFpMxWhu4.jpg'
																										}
																									]
																								}
																							]
																						}
																					]
																				},
																				{
																					elem: 'block',
																					content: [
																						{
																							block: 'text',
																							mods: { size: 's', view: 'primary' },
																							mix: { block: 'decorator', mods: { 'space-b': 'xs' } },
																							content: "@queenmarkers"
																						},
																					]
																				}
																			]
																		}

																	]
																}
															]
														},
														{
															block: 'image',
															mix: { block: 'pt-card', elem: 'image', },
															url: 'https://pp.userapi.com/c830208/v830208641/191ae9/xQ8YoE1TARo.jpg'
														}
													]
												}
											]
										},

									]
								}
							]
						},

					]
				},
				{
					elem: 'section',
					attrs: { style: 'background:#F3F3F3;' },
					content: [
						{
							elem: 'container',
							elemMods: { size: 'm', align: 'center' },
							content: [
								{
									elem: 'container',
									attrs: { style: 'padding: 64px 0; width: 547px;' },
									elemMods: { size: 'xs', align: 'center' },
									content: [
										{
											block: 'text',
											mods: { size: 'xl', view: 'primary', align: 'center', },
											content: 'Вопросы и ответы',
										}

									]
								},
								{
									block: 'question',
									mods: { view: 'open' },
									mix: { block: 'pt-list' },
									content: [
										{
											block: 'text',
											content: 'Агрессивны ли пинерейцы?'
										},

										{
											block: 'paragraph',
											content: [
												{
													block: 'text',
													content: 'Согласно официальному стандарту породы, агрессивность считается пороком, и такие собаки подлежат выбраковке.'
												},
												{
													block: 'text',
													content: 'В Северо-Западном регионе России в последние несколько лет сложилось поголовье пиренейских горных собак с серьёзными отклонениями в поведении. От их владельцев нарастает поток жалоб на опасное поведение собак, это очень тревожно. Будьте внимательны, приобретая щенка в питерских питомниках.'
												},
												{
													block: 'text',
													content: 'Обращайте внимание на выражение глаз, которое напрямую связано с характером собаки. Если нет правильного "пиренейского выражения", то и пиренейского поведения ждать не стоит. Настоящие представители породы - добрые собаки, они сторожат только на своей территории, а за пределами участка ведут себя нейтрально по отношению к людям и животным.'
												}
											]

										}


									]
								},
								{
									elem: 'footer',
									content: []
								}

							]
						}
					]
				}
			]

		}

	]






};