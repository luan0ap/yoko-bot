const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./settings.json');
//var arr = process.env.IAM_ROLES
var arr = "C atribuível 1|||c atribuível 2"
const iam_roles = arr.split('|||')
var bann = 0;

function isNumber(num){
	return !isNaN(num)
}
function tempo(time){
	var now = new Date().getTime();
	while(new Date().getTime() < now + time){}
}
bot.on('ready', () =>{
	console.log(`Bot Online`)
	console.log(`Tag: ${bot.user.tag}`)
	console.log(`Id: ${bot.user.id}`)
	bot.user.setPresence({game: {name: `${bot.guilds.get(config.servidor).memberCount} Membros | ${config.prefix}help | ${config.status}`}, status: 'online'})
	setInterval(function(){
		bot.user.setPresence({game: {name: `${bot.guilds.get(config.servidor).memberCount} Membros | ${config.prefix}help | ${config.status}`}, status: 'online'})
	}, 15 * 60000);
	cmsg = ":white_check_mark:Olá minna-san!:white_check_mark:\n"
	cmsg += "Fiquem sempre ligados na <#436693585690361857> e <#436687120854286346> para não haver controvérsias!\n"
	cmsg += "Continue se divertindo no ``Porão dos Animes``.\n"
	if(config.enable_automsg){
		setInterval(function(){
			bot.channels.get(config.automsg_channel).send(cmsg).then(m =>{
				setTimeout(function(){
					m.delete();
				}, config.automsg_interval * 60000);
			})
		}, config.automsg_interval * 60000);
	}
});

bot.on('message', msg =>{
	if(msg.content.startsWith(`${config.prefix}help`)){
		help = `**${config.prefix}ban** - Bane o membro designado;\n`
		help += `**${config.prefix}kick** - Kicka o membro designado;\n`
		help += `**${config.prefix}unban** - Desbane o usuário designado pelo id; Exemplo: .unban 123456789123456789;\n`
		help += `**${config.prefix}mute** - Muta o membro designado por ${config.mute_time.toString()} minutos.;\n`
		help += `**${config.prefix}tmute** - Muta o membro designado pelos minutos designados; Ex: .mute @membro#0000 10;\n`
		help += `**${config.prefix}unmute** - Desmuta o membro designado;\n`
		help += `**${config.prefix}prune** - Deleta a quantidade designada de mensagens do canal em que o comando foi utilizado;\n`
		help += `**${config.prefix}say** - Manda a mensagem designada;\n`
		help2 = `**${config.prefix}iam** - Coloca o cargo ***ATRIBUÍVEL*** desejado;\n`
		help2 += `**${config.prefix}iamn** - Remove o cargo ***ATRIBUÍVEL*** desejado;\n`
		const emb = new Discord.RichEmbed();
		emb.setTitle('Comandos de Administrador:');
		emb.setDescription(help);
		emb.setColor(0x00C0A0);
		const emmb = new Discord.RichEmbed();
		emmb.setTitle('Comandos Normais')
		emmb.setDescription(help2);
		emmb.setColor(0x00C0A0);
		if(config.command_delete){msg.delete()};
		msg.author.send(emb).then(() =>{
			msg.author.send(emmb)
			msg.channel.send(`<@${msg.author.id}> **Mensagem enviada no privado.**`).then(m=>{
				setTimeout(function(){
					m.delete();
				}, 5000)
		});
		}).catch(err => {
			msg.channel.send(`<@${msg.author.id}> **A mensagem não pôde ser enviada, por favor habilite a opção __"Permitir mensagens diretas de membros do serviror"__ nas opções de privacidade.**`).then(mm => {
				setTimeout(function(){
					mm.delete();
				}, 10000)
			});
		})
	}
	if(msg.content.startsWith(`${config.prefix}say `)){
		if(msg.guild.member(msg.author).hasPermission(0x00002000, false, true, true))
			if(config.command_delete){msg.delete()};
			mensagenzinha = msg.content.slice(`${config.prefix}say `.length, msg.content.length)
			msg.channel.send(mensagenzinha)
	}
	if(msg.content.startsWith(`${config.prefix}ban `)){
		member = msg.mentions.members.first();
		if(msg.guild.member(msg.author).hasPermission(0x00000004, false, true, true)){
			if(msg.guild.member(msg.author).highestRole.calculatedPosition > member.highestRole.calculatedPosition){
				if(config.command_delete){msg.delete()};
				const emm = new Discord.RichEmbed();
				emm.setTitle(`O membro ${member.user.username} foi banido do serviror ${msg.guild.name}`)
				emm.setImage(config.banimg)
				emm.setAuthor(`Adm: ${msg.author.username}`, msg.author.avatarURL)
				emm.setColor(0x3368FF)
				msg.channel.send(emm)
				const embm = new Discord.RichEmbed();
				embm.setTitle(`${member.user.username} Foi Banido.`)
				embm.addField("Menção do usuário:", `<@${member.user.id}>`, true)
				embm.addField("ID:", member.user.id)
				embm.setFooter(`Quem baniu: ${msg.author.username}`, msg.author.avatarURL)
				embm.setThumbnail(member.user.avatarURL)
				embm.setAuthor("Ban Log", config.bimg)
				embm.setColor(0x3368FF)
				bot.channels.get(config.banlog).send(embm)
				bann = 1;
				member.ban().then(() => {
					setTimeout(function(){
						bann = 0;
					}, 500)
				});
			}
			else{
				msg.channel.send(`${msg.author} **Você não pode banir membros com o mesmo cargo ou acima do seu.**`).then(m => {
					setTimeout(function(){
						m.delete();
					}, 5000)
				})
			}
		}
	}
	if(msg.content.startsWith(`${config.prefix}unban `)){
		id = msg.content.slice(`${config.prefix}unban `.length, msg.content.length)
		if(isNumber(id)){
			if(id.length === 18){
				msg.guild.unban(bot.users.get(id)).then(() => {
					if(config.command_delete){msg.delete()};
					const bem = new Discord.RichEmbed();
					bem.setTitle(`O usuário ${bot.users.get(id).tag} foi desbanido do servidor ${msg.guild.name}`)
					bem.setAuthor(`Adm: ${msg.author.username}`, msg.author.avatarURL)
					bem.setColor(0x3368FF)
					const mal = new Discord.RichEmbed();
					mal.setTitle(`O usuário ${bot.users.get(id).tag} foi desbanido do servidor ${msg.guild.name}`)
					mal.setAuthor("Ban Log", config.bimg)
					mal.addField("ID:", id)
					mal.setFooter(`Adm: ${msg.author.username}`, msg.author.avatarURL)
					mal.setThumbnail(bot.users.get(id).avatarURL)
					mal.setColor(0x3368FF)
					msg.channel.send(bem)
					bot.channels.get(config.banlog).send(mal)
				}).catch(err => {
					msg.channel.send(`${msg.author} **O usuário não existe ou ainda não foi banido do servidor.**`)
				});
			}
			else{
				msg.channel.send(msg.author + "**Isso não é um id: **``" + id + "``")
			}
		}
		else{
			msg.channel.send(msg.author + "**Isso não é um id: **``" + id + "``")
		}
	}
	if(msg.content.startsWith(`${config.prefix}kick `)){
		membroo = msg.mentions.members.first();
		if(msg.guild.member(msg.author).hasPermission(0x00000002, false, true, true)){
			if(msg.guild.member(msg.author).highestRole.calculatedPosition > membroo.highestRole.calculatedPosition){
				if(config.command_delete){msg.delete()};
				const kickm = new Discord.RichEmbed();
				kickm.setTitle(`O usuário ${membroo.user.username} foi kickado do servidor ${msg.guild.name}.`)
				kickm.setColor(0x3368FF)
				kickm.setImage(config.kickimg)
				kickm.setAuthor(`Adm: ${msg.author.username}`, msg.author.avatarURL)
				const kickn = new Discord.RichEmbed();
				kickn.setTitle(`O usuário ${membroo.user.username} foi kickado do servidor ${msg.guild.name}.`)
				kickn.addField("Menção do Usuário:", `<@${membroo.user.id}>`, true)
				kickn.addField("ID:", membroo.user.id)
				kickn.setThumbnail(membroo.user.avatarURL)
				kickn.setAuthor('Ban Log', config.bimg)
				kickn.setFooter(`Quem kickou: ${msg.author.username}`, msg.author.avatarURL)
				kickn.setColor(0x3368FF)
				membroo.kick();
				msg.channel.send(kickm);
				bot.channels.get(config.banlog).send(kickn);
			}
			else{
				msg.channel.send(`${msg.author} **Você não pode kickar membros com o mesmo cargo ou acima do seu.**`).then(m =>{
					setTimeout(function(){
						m.delete();
					}, 5000)
				})
			}
		}
	}
	if(msg.content.startsWith(`${config.prefix}mute `)){
		membr = msg.mentions.members.first();
		if(msg.guild.member(msg.author).hasPermission(0x00400000, false, true, true)){
			if(config.command_delete){msg.delete()};
			membr.addRole(config.mute_role)
			membr.setMute(true)
			const mut = new Discord.RichEmbed();
			mut.setTitle(`O membro ${membr.user.username} foi mutado por ${config.mute_time} minutos.`)
			mut.setColor(0x3368FF)
			mut.setAuthor(`Adm: ${msg.author.username}`, msg.author.avatarURL)
			msg.channel.send(mut)
			setTimeout(function(){
				membr.removeRole(config.mute_role)
				membr.setMute(false)
			}, config.mute_time * 60000);
		}
	}
	if(msg.content.startsWith(`${config.prefix}unmute `)){
		membr = msg.mentions.members.first();
		if(msg.guild.member(msg.author).hasPermission(0x00400000, false, true, true)){
			if(config.command_delete){msg.delete()};
			const mutt = new Discord.RichEmbed();
			mutt.setTitle(`O membro ${membr.user.username} foi desmutado.`)
			mutt.setColor(0x3368FF)
			mutt.setAuthor(`Adm: ${msg.author.username}`, msg.author.avatarURL)
			msg.channel.send(mutt)
			membr.removeRole(config.mute_role)
			membr.setMute(false)
		}
	}
	if(msg.content.startsWith(`${config.prefix}prune `)){
		mnumber = msg.content.slice(`${config.prefix}prune `.length, msg.content.length)
		if(msg.guild.member(msg.author).hasPermission(0x00002000, false, true, true)){
			if(config.command_delete){msg.delete()};
			if(isNumber(mnumber)){
				msg.channel.bulkDelete(parseInt(mnumber)).then(messages =>{
					const delm = new Discord.RichEmbed();
					delm.setDescription(`Foram deletadas: ${"``" + messages.size.toString() + "``"} mensagens do canal ${"``" + msg.channel.name + "``"}.`)
					delm.setColor(0x3368FF)
					msg.channel.send(delm).then(m =>{
						setTimeout(function(){
							m.delete();
						}, 5000)
					})
				})
			}
			else{
				msg.channel.send(`${msg.author} **Isto não é um número:** ` + "``" + mnumber + "``**.**").then(m =>{
					setTimeout(function(){
						m.delete();
					}, 5000)
				})
			}
		}
	}
	if(msg.content.startsWith(`${config.prefix}tmute `)){
		memberr = msg.mentions.members.first();
		minutess = msg.content.slice(`${config.prefix}tmute `.length, msg.content.length)
		minutes = minutess.split(" ",2)[1]
		if(msg.guild.member(msg.author).hasPermission(0x00400000, false, true, true)){
			if(isNumber(minutes)){
				const tmut = new Discord.RichEmbed();
				tmut.setTitle(`O membro ${memberr.user.username} foi mutado por ${minutes} minutos.`)
				tmut.setColor(0x3368FF)
				tmut.setAuthor(`Adm: ${msg.author.username}`, msg.author.avatarURL)
				msg.channel.send(tmut)
				memberr.setMute(true)
				memberr.addRole(config.mute_role)
					.then(() =>{
						setTimeout(function(){
							memberr.setMute(false)
							memberr.removeRole(config.mute_role)
						}, parseInt(minutes) * 60000);
					});
			}
			else{
				msg.channel.send(`${msg.author} **Isto não é um número:** ` + "``" + minutes + "``")
			}
		}
	}
	if(msg.content.startsWith(`${config.prefix}iam `)){
		role_name = msg.content.slice(`${config.prefix}iam `.length, msg.content.length).trim()
		if(iam_roles.includes(role_name)){
			msg.guild.member(msg.author).addRole(msg.guild.roles.find("name", role_name)).then(() =>{
				msg.channel.send(`${msg.author} **O cargo ${"``" + role_name + "``"} foi adicionado com sucesso.**`)
			});
		}
		else{
			msg.channel.send(`${msg.author} **Não possuimos nenhum cargo atribuível de nome ${"``" + role_name + "``"}.**`)
		}
	}
	if(msg.content.startsWith(`${config.prefix}iamn `)){
		role_name = msg.content.slice(`${config.prefix}iamn `.length, msg.content.length).trim()
		if(iam_roles.includes(role_name)){
			msg.guild.member(msg.author).removeRole(msg.guild.roles.find("name", role_name)).then(() =>{
				msg.channel.send(`${msg.author} **O cargo ${"``" + role_name + "``"} foi retirado com sucesso.**`)
			});
		}
		else{
			msg.channel.send(`${msg.author} **Não possuimos nenhum cargo atribuível de nome ${"``" + role_name + "``"}.**`)
		}
	}
});
bot.on('guildBanAdd', (server, member) =>{
	if(bann === 0){
		const bn = new Discord.RichEmbed();
		bn.setTitle(`O membro ${member.username} foi banido do servidor ${server.name}.`)
		bn.setThumbnail(member.avatarURL)
		bn.addField("Menção do Usuário:", `<@${member.id}>`)
		bn.addField("ID:", member.id, true)
		bn.setAuthor("Ban Log", config.bimg)
		bn.setColor(0x3368FF)
		bot.channels.get(config.banlog).send(bn)
	}
});
bot.on('guildMemberAdd', member =>{
	if(config.welcome_msgs){
		welcome = `Bem Vindo(a) <@${member.id}>!\n`
		welcome += `-------------------------------------------\n`
		welcome += `Esperamos que você se divirta, faça novas amizades, e antes de tudo leia <#436693585690361857> e <#436687120854286346> para não haver controvérsias no servidor!.\n`
		//welcome += `Dê uma boa olhada em <#392137372038594562> e <#392526981520031756>,\n`
		//welcome += `e fique por dentro de tudo.`
		const welm = new Discord.RichEmbed();
		welm.setTitle(`Bem Vindo(a) ao ${member.guild}!`)
		welm.setDescription(welcome)
		welm.setColor(0x3368FF)
		welm.setImage(config.welcomeimg)
		welm.setFooter(`by: ${member.guild.owner.user.username}`, member.guild.owner.user.avatarURL)
		welm.setThumbnail(member.user.avatarURL)
		bot.channels.get(config.welcome).send(welm)
	}
});
//ttoken = process.env.BOT_TOKEN
bot.login(config.token);