const Discord = require('discord.js');
const emoji = require('../../emojis.json')
const Welcome = require('../../database/models/Welcome')

const ms = require('ms');
module.exports = {
    name: 't-deblacklist',
    description: 'Déblackliste une personne du système de tickets . Cette personne pourra ouvrir à nouveau des tickets sur le serveur.',
    aliases: ['deblacklist-ticket', 'ticket-deblacklist'],
    guildOnly: true,
    args: true,
    usage: '<id>',
    exemple: '447357094895550474',
    cat: 'moderation',
    permissions: ['MANAGE_GUILD'],
    botpermissions: ["SEND_MESSAGES", "EMBED_LINKS", ],
    async execute(message, args, client) {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.filter(m => m.user.tag.includes(args.join(" "))).first()
        if (!member) {
            return message.errorMessage(`Vous devez mentionner un membre valide ou fournir un ID valide.`)
        }

        const verify = await Welcome.findOne({ serverID: message.guild.id, channelID: member.user.id, reason: `ticket_black` })
        if (verify) {
            const deletee = await Welcome.findOneAndDelete({ serverID: message.guild.id, channelID: member.user.id, reason: `ticket_black` })
            message.succesMessage(`**${member.user.username}** n'est plus dans la blacklist des tickets ! Il pourra à nouveau ouvrir des tickets !`)
        } else {
            return message.errorMessage(`**${member.user.username}** N'est pas déja blacklisté des tickets , je ne peux donc pas le déblacklister.`);


        }


    },
};