exports.parseUser = (message, user) => {
  const member = message.guild.member(user) || null;
  if (user.id === message.author.id) {
    return;
  } else if (member) {
    if (member.highestRole.position >= message.member.highestRole.position) return;
  }
  return user;
};
