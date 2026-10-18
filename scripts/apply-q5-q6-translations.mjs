import fs from 'node:fs';
import path from 'node:path';

const vi = {
'b5_l01_t01': `Từ rất sớm tôi đã mong có cơ hội đến Trung Quốc học tiếng Hán. Bây giờ ước nguyện ấy cuối cùng đã trở thành hiện thực, trong lòng tôi vui đến mức không biết diễn tả thế nào.

Từ mùa hè năm ngoái, tôi đã bận rộn liên hệ với trường học và làm đủ loại thủ tục, nhưng tất cả những việc này tôi đều giấu bố mẹ. Tôi là con gái một, nếu nói cho bố mẹ biết thì phần lớn họ sẽ không đồng ý. Vì vậy, tôi chỉ bàn bạc với bạn bè và thầy giáo dạy tiếng Hán cho tôi, đợi làm xong mọi thủ tục rồi mới nói với bố mẹ. Nghe xong, quả nhiên họ không mấy đồng ý. Bố nói: “Công việc hiện tại của con chẳng phải đang rất tốt sao?” Mẹ nói: “Con không định kết hôn à?”

Nói thật, tôi vẫn chưa nghĩ rõ sau này mình sẽ làm gì. Nhưng bây giờ tôi chỉ muốn học tiếng Hán, muốn đến Trung Quốc — một đất nước vừa cổ kính vừa trẻ trung — để tận mắt nhìn xem. Nói đến bố mẹ, tôi đã lớn rồi, giống như một chú chim nhỏ, đã đến lúc phải tự mình bay. Tôi muốn sống độc lập, tự do tự tại ở nước ngoài một năm, rồi sau đó mới tính chuyện tương lai. Bố mẹ hiểu tính tôi, chuyện đã quyết định thì sẽ không thay đổi, hơn nữa họ cũng thấy suy nghĩ của tôi là đúng, nên đành đồng ý.

Mẹ yêu cầu sau khi đến Trung Quốc, mỗi tuần tôi phải gọi điện cho mẹ một lần. Bố nói tốt nhất nên thường xuyên gửi email, kể cho họ nghe mọi chuyện của tôi ở Trung Quốc. Tôi đồng ý. Trước khi đi, họ mua cho tôi rất nhiều đồ, cứ cố nhét đầy vào va-li.

Bố lái xe đưa tôi ra sân bay. Lúc chia tay, bố đứng từ xa nhìn tôi và không ngừng vẫy tay, còn mẹ thì lau nước mắt. Nhìn dáng vẻ lưu luyến không nỡ rời xa của bố mẹ, nước mắt tôi cũng bất chợt trào ra.

Sau khi đến Trung Quốc, bố mẹ thường xuyên viết thư, lúc nào cũng dặn tôi chú ý sức khỏe, chú ý an toàn, chăm chỉ học tập và sống thật vui vẻ.

Để họ yên tâm, tôi cũng thường viết thư hoặc gọi điện về, bày tỏ tình yêu và nỗi nhớ của mình đối với bố mẹ.`,
'b5_l02_t01': `Bố mẹ thân yêu,

Bố mẹ khỏe không? Bố vẫn bận như trước chứ? Nhất định phải chú ý giữ gìn sức khỏe nhé.

Quà sinh nhật bố mẹ gửi, tuần trước con đã nhận được rồi. Hiện giờ mọi thứ của con đều rất tốt: ăn ngon, ngủ ngon, học hành cũng khá. Bố mẹ cứ yên tâm.

Lúc mới đến có rất nhiều điều con chưa quen, nhưng bây giờ về cơ bản con đã quen với cuộc sống ở đây. Việc học cũng không có vấn đề gì. Người Trung Quốc thường nói: “Ở nhà nhờ cha mẹ, ra ngoài nhờ bạn bè.” Bây giờ con đã kết được rất nhiều bạn. Mấy tấm ảnh con gửi về hôm nay, tấm đầu tiên là cảnh cả lớp cùng tổ chức sinh nhật cho con. Lớp con có mười tám học sinh, lần lượt đến từ mười một quốc gia thuộc năm châu: châu Á, châu Phi, châu Âu, châu Mỹ và châu Đại Dương. Được học cùng nhiều bạn như vậy, được quen biết nhiều bạn bè đến từ khắp nơi trên thế giới, con cảm thấy rất vui. Mọi người cùng học, cùng trò chuyện, cùng tham gia các hoạt động ngoại khóa, quan tâm và giúp đỡ lẫn nhau, rất đoàn kết. Vì vậy mỗi ngày con đều sống rất vui vẻ. Chàng trai cao lớn, tóc vàng, mắt xanh đứng cạnh con chính là bạn thân của con, trông rất đẹp trai phải không? Hai chúng con thường đi chơi cùng nhau và còn cùng học Thái Cực Quyền.

Tấm thứ hai được chụp khi con đang học Thái Cực Quyền. Hiện giờ mỗi tuần con có hai buổi chiều đến nhà thi đấu học Thái Cực Quyền. Đây là một môn vận động rất thú vị, động tác mềm mại, chậm rãi, đẹp và khoan thai, lại có tác dụng tăng cường thể chất và phòng ngừa bệnh tật, nên là một môn thể thao rất được ưa chuộng. Mỗi lần tập xong, con đều cảm thấy toàn thân đặc biệt dễ chịu. Sau khi về nước, con muốn dạy bố mẹ tập Thái Cực Quyền.

Tấm thứ ba là lúc con đang dùng bút lông vẽ tranh và viết chữ Hán. Ngoài việc học tiếng Hán, con còn tham gia một lớp thư pháp và hội họa, học viết chữ bằng bút lông và vẽ tranh Trung Quốc. Con thấy rất thú vị. Tuần trước con vẽ một bức trúc và viết một bài thơ Đường. Thầy nói con vẽ rất đẹp, còn đem treo trong tủ triển lãm của trường. Nhìn thấy vậy con vừa vui vừa ngượng. Bạn bè xem xong đều chúc mừng con.

À, con còn học được cách dùng đũa để ăn cơm. Tấm cuối cùng là lúc con đang dùng đũa. Hôm kia khi đi ăn vịt quay Bắc Kinh, con nhờ bạn chụp lại dáng con dùng đũa. Bố mẹ xem thử, thế nào? Vui không?

Bố mẹ lo mùa đông Bắc Kinh quá lạnh, sợ con không thích nghi được. Nhưng con hoàn toàn không thấy lạnh. Có lẽ Bắc Kinh cũng ấm lên rồi. Khi còn ở nhà, cứ đến mùa đông con đều bị cảm một hai lần. Đến Trung Quốc gần nửa năm rồi, vì ngày nào cũng kiên trì rèn luyện nên con chưa bị ốm lần nào.

Con viết đến đây thôi. Con phải đi ra ngoài với bạn rồi.

Chúc bố mẹ luôn mạnh khỏe!

Mary
Ngày 28 tháng 1`,
'b5_l03_t01': `Phần lớn các khu vực ở Trung Quốc trong một năm đều có bốn mùa: xuân, hạ, thu, đông.

Lấy thủ đô Bắc Kinh làm ví dụ: từ tháng ba đến tháng năm là mùa xuân, tháng sáu đến tháng tám là mùa hè, tháng chín đến tháng mười một là mùa thu, còn từ tháng mười hai đến tháng hai năm sau là mùa đông.

Mùa xuân đến, cây cối xanh lên, hoa nở, thời tiết ấm hơn. Mọi người cởi áo mùa đông, thay quần áo mùa xuân. Các cô gái và chàng trai ăn mặc thật đẹp, họ chèo thuyền trên hồ, chụp ảnh bên hoa; trong công viên tràn ngập tiếng hát và tiếng cười của người trẻ. Di Hòa Viên, Bắc Hải, Hương Sơn, Vạn Lý Trường Thành và Thập Tam Lăng… đâu đâu cũng có thể thấy du khách đến từ khắp nơi trên thế giới.

Mùa hè đến, trời nóng. Mọi người thường đi bơi. Sau bữa tối, những người đã làm việc cả ngày thích ra ngoài đi dạo và trò chuyện. Ven đường và trong công viên đều có người đi dạo. Họ vừa đi vừa nói chuyện, trông vui vẻ và thư thái.

Mùa đông Bắc Kinh khá lạnh, nhưng bật hệ thống sưởi lên thì trong nhà rất ấm. Đến mùa đông, mọi người thích ăn “lẩu”. Một gia đình vài người hoặc ba năm người bạn vui vẻ quây quần quanh nồi lẩu, vừa ăn, vừa uống, vừa trò chuyện. Khung cảnh ấy khiến người ta thật ngưỡng mộ và ao ước.

Mùa đông Bắc Kinh không thường có tuyết, nhưng hễ tuyết rơi thì mọi người vui như ngày hội. Cảnh đẹp nhất mùa đông chính là cảnh tuyết. Rất nhiều người mang máy ảnh ra ngoài chụp hình. Trẻ con chẳng sợ lạnh chút nào, chạy nhảy trên tuyết, đắp người tuyết, ném tuyết vào nhau, mặt và tay lạnh đỏ bừng mà vẫn chơi rất vui. Người Bắc Kinh thích tuyết. Người ta nói “tuyết lành báo năm được mùa”; nếu mùa đông có vài trận tuyết lớn thì năm sau chắc chắn sẽ có vụ mùa bội thu.

Mùa đẹp nhất trong năm ở Bắc Kinh phải kể đến mùa thu. Thời tiết không lạnh cũng không nóng, ít mưa và cũng hiếm khi có gió lớn. Trên phố đâu đâu cũng là hoa tươi, khắp nơi là rau quả. Mỗi cuối tuần, mọi người đều thích ra ngoại ô chơi. Những ngọn núi đầy lá đỏ là cảnh đẹp nhất của mùa thu. Leo Hương Sơn và ngắm lá đỏ là hoạt động được người Bắc Kinh yêu thích nhất.

Kỳ nghỉ Quốc khánh đúng vào lúc Bắc Kinh có phong cảnh đẹp nhất trong năm. Mỗi dịp Quốc khánh, rất nhiều du khách từ khắp cả nước tận dụng kỳ nghỉ đến Bắc Kinh du lịch. Nếu có thể đến Quảng trường Thiên An Môn nhìn một lần, bạn sẽ thấy đất nước cổ kính này ngày nay trẻ trung biết bao, và cảm nhận được người Trung Quốc cần cù, lương thiện, yêu hòa bình nhiệt tình đến mức nào. Có lẽ bạn sẽ yêu thành phố xinh đẹp này và yêu những con người nhiệt tình, thân thiện ở đây.

Các bạn thân mến, chúc các bạn sống bình an và vui vẻ ở Bắc Kinh, ở Trung Quốc.`,
'b5_l04_t01': `Năm tốt nghiệp trung học, tôi cũng không rõ mình nên thi vào trường đại học nào, học chuyên ngành gì. Có lần tôi cùng bạn xem một bộ phim giới thiệu văn hóa Trung Quốc, rất thú vị. Lúc đó tôi nghĩ: học tiếng Trung, sau này làm phiên dịch thì thế nào? Mẹ biết suy nghĩ của tôi thì rất tán thành, bà nói con gái làm phiên dịch rất tốt. Thế là tôi thi đỗ vào khoa tiếng Trung của một trường đại học.

Kỳ nghỉ hè năm thứ ba đại học, lần đầu tiên tôi đến Trung Quốc, học bốn tuần tại Đại học Ngôn ngữ Bắc Kinh, sau đó lại đi du lịch một tháng ở một số thắng cảnh nổi tiếng của Trung Quốc. Lúc ấy tôi mới biết mình hiểu về Trung Quốc quá ít.

Vì tiếng Hán chưa tốt, trong chuyến đi tôi gặp rất nhiều khó khăn. Nhưng mỗi khi gặp khó khăn, tôi đều nhận được sự giúp đỡ của người khác. Có lần tôi đi tàu hỏa đến Nam Kinh. Tôi hoàn toàn không biết gì về Nam Kinh, tàu lại đến vào buổi tối; làm thế nào tìm khách sạn, làm sao mua vé tàu đi Thượng Hải, tôi đều không biết. Tôi nhìn bản đồ mà trong lòng thật sự hơi sốt ruột.

Một cô gái ngồi đối diện dường như nhận ra tâm sự của tôi, liền dùng tiếng Anh hỏi tôi có phải du học sinh không và có cần cô ấy giúp không. Tiếng Anh của cô ấy rất tốt. Tôi kể cho cô ấy những khó khăn mình đang gặp. Cô ấy nói: “Đừng lo, tôi cũng xuống tàu ở Nam Kinh. Xuống tàu rồi bạn cứ đi theo tôi.”

Thế là chúng tôi bắt đầu trò chuyện. Cô ấy là sinh viên một trường đại học ở Nam Kinh. Cô ấy nói: “Nếu bạn muốn, tôi có thể đưa bạn đi xem một số thắng cảnh ở Nam Kinh.” Tôi nói: “Như vậy thì tất nhiên rất tốt, nhưng có làm phiền bạn quá không?” Cô ấy nói: “Bây giờ đúng lúc nghỉ, tôi rảnh. Chúng ta có thể học lẫn nhau: tôi giúp bạn luyện tiếng Hán, bạn cũng giúp tôi luyện tiếng Anh.”

Như vậy, tôi đã có người bạn Trung Quốc đầu tiên.

Tôi chơi ở Nam Kinh ba ngày. Trong ba ngày đó, cô ấy gần như trở thành hướng dẫn viên của tôi, đưa tôi đến rất nhiều địa điểm nổi tiếng ở Nam Kinh, lại còn giúp tôi mua vé tàu đi Thượng Hải. Khi chia tay, cô ấy nói: “Hoan nghênh bạn lại đến.” Tôi nói: “Nhất định tôi sẽ quay lại. Tôi nhất định phải học giỏi tiếng Hán để thực hiện lý tưởng làm phiên dịch của mình.”`,
'b5_l04_t02': `Gần đây tôi học được một bài hát tiếng Trung, rất hay và cũng rất có ý nghĩa. Trong đó có một câu hát khiến tôi suy nghĩ rất nhiều: “Không trải qua mưa gió, sao có thể thấy cầu vồng; không ai có thể dễ dàng thành công.”

Tôi đã đến Trung Quốc được nửa năm. Nửa năm du học đã cho tôi nếm trải đủ những vị chua, ngọt, đắng, cay mà trước đây chưa từng trải qua. Có một thời gian tôi thường một mình lén khóc, có lúc khóc rồi ngủ thiếp đi. Trong mơ tôi thấy quê hương, thấy những người thân ở quê. Trong mơ tôi nói với bố mẹ: “Đứa con gái ngốc của bố mẹ thua rồi, thất bại rồi, đã mất niềm tin vào việc học và vào chính mình.”

Bố mẹ viết thư bảo tôi về nước, nhưng tôi nghĩ mình không thể. Sang Trung Quốc du học, học tiếng Hán là con đường do chính tôi lựa chọn. Trên đường đời chắc chắn sẽ gặp đủ loại khó khăn; nếu vừa gặp khó khăn đã lùi bước thì làm sao có thể thành công? Tôi quyết định kiên trì. Thầy cô cũng thường động viên tôi: kiên trì chính là thắng lợi.

Ước mơ của tôi là trở thành giáo viên tiếng Hán. Không học giỏi tiếng Hán thì làm sao có thể làm giáo viên tiếng Hán?

Nghĩ đến đây, tôi thấy mình thật buồn cười. Đã mười tám tuổi, không còn là trẻ con nữa, tại sao cứ gặp khó khăn là khóc? Tại sao không thể mạnh mẽ hơn một chút?

Trong lòng tôi lại vang lên bài hát ấy: “Không trải qua mưa gió, sao có thể thấy cầu vồng; không ai có thể dễ dàng thành công.” Đúng vậy, muốn thành công thì nhất định phải bỏ ra những nỗ lực gian khổ.`,
'b5_l05_t01': `Khi mới đến Bắc Kinh, tôi từng nghe một tiết mục tấu hài nói rằng câu cửa miệng của người Bắc Kinh là “Ăn chưa?”. Sau này tôi phát hiện ra, thật ra câu người Bắc Kinh thích nói nhất lại là “Để sau hãy nói”.

Tôi lên máy bay của Hàng không Dân dụng Trung Quốc ở Hồng Kông. Người ngồi bên cạnh dùng tiếng Anh rất chuẩn hỏi tôi: “Đến Bắc Kinh làm việc à?” “Không, đi du học!” tôi trả lời. Anh ấy là người Trung Quốc. Chúng tôi cứ thế vui vẻ trò chuyện suốt đường bay. Trước khi xuống máy bay, anh ấy còn đưa cho tôi một tấm danh thiếp, mời tôi khi nào rảnh thì đến nhà chơi.

Cuối tuần thứ hai sau khi đến Bắc Kinh, tôi gọi điện cho người đàn ông quen trên máy bay. Anh ấy nhiệt tình nói qua điện thoại: “Khi nào rảnh thì đến nhà chơi nhé.” Tôi lập tức vui lên, nói: “Hay quá, khi nào tôi đến được?” Anh ấy ngừng một lúc rồi nói: “Dạo này công việc bận quá, để sau hãy nói nhé.” Thế nhưng gần như lần nào gọi điện, anh ấy cũng nói hoan nghênh tôi đến nhà, rồi lại kèm một câu “để sau hãy nói”.

Tôi bắt đầu nghĩ: chẳng phải đã nói rảnh thì cứ đến sao, sao lại thiếu thành ý như thế? Sau ba lần “để sau hãy nói”, cuối cùng tôi cũng đến nhà anh ấy. Anh ấy và vợ đều vô cùng nhiệt tình, đi chợ nấu cơm, chuẩn bị đầy một bàn đồ ăn thức uống cho tôi ăn thật no. Trước khi về, anh ấy còn tặng tôi rất nhiều sách. Tôi nhìn sơ giá tiền, hơn năm trăm tệ, nên nói: “Anh tặng tôi sách đắt thế này, tôi nhất định phải trả tiền.” Anh ấy bình thản nói: “Những sách này đều là thứ bạn cần dùng, còn chuyện tiền bạc, để sau hãy nói.” Sau đó tôi nhiều lần nhắc chuyện trả tiền sách, anh ấy đều nói: “Để sau hãy nói.”

Trong những ngày ở Bắc Kinh, tôi thường xuyên nghe câu “để sau hãy nói”. Điều câu nói ấy đem lại cho tôi không chỉ là một lời từ chối khách sáo, mà còn là sự chờ đợi ấm áp.

Hôm đó, tôi lên tàu điện ngầm ở Kiến Quốc Môn. Đây là lần đầu tiên tôi đi tàu điện ngầm ở Trung Quốc. Trên tàu rất đông. Khi xuống tàu rồi lên mặt đất, tôi mới phát hiện đây không phải nơi mình muốn đến, vì tôi không tìm thấy bến xe buýt tuyến 375 quen thuộc. Đang nhìn đông nhìn tây, hai chàng trai phía sau chủ động chào tôi, tôi không để ý. Một lúc sau, thấy tôi vẫn đứng đó, họ hỏi tôi muốn đi đâu. Tôi hỏi đường đến bến xe 375. Họ nói bến 375 ở Tây Trực Môn, còn đây là Phục Hưng Môn, cách Tây Trực Môn còn xa. Khi biết tôi muốn về trường, họ nói: “Lên xe đi, chúng tôi vừa hay đi về hướng Di Hòa Viên, có thể đưa bạn một đoạn.” Tôi do dự rồi mới lên xe của họ. Trên đường tôi không nói gì vì không muốn giao tiếp nhiều với người lạ. Đến cổng trường, tôi xuống xe, lấy tiền định đưa cho họ, hai chàng trai cười nói: “Chúng tôi đâu phải taxi, chỉ tiện đường đưa bạn thôi, sao có thể lấy tiền?” Nghe họ nói, lòng tôi ấm lên, vội cảm ơn và hỏi họ tên gì, ở đâu. Nhưng họ đã nổ máy, vẫy tay với tôi và nói: “Biết đâu sau này chúng ta còn gặp lại, để sau hãy nói nhé.” Nói rồi họ lái xe đi. Tôi đứng sững ở đó, không biết nói gì. Đến giờ tôi vẫn chưa gặp lại hai chàng trai nhiệt tình, thân thiện ấy.

Tôi còn phải học tập và sinh sống ở Bắc Kinh rất lâu, còn nhiều ngày giao tiếp với người Trung Quốc. Có lẽ tôi sẽ còn gặp nhiều chuyện thú vị hơn nữa; chuyện ấy thì chúng ta cũng “để sau hãy nói” nhé.`,
'b5_l06_t01': `Trong sân nhà tôi có một cây nho, mấy năm nay cứ sống dở chết dở. Không ngờ năm ngoái nó lại mọc ra rất nhiều lá, còn kết rất nhiều nho. Khi mùa thu đến, từng chùm nho đỏ tím nhìn thật vui mắt. Hái xuống nếm thử thì đặc biệt ngọt, tôi liền muốn đem một ít cho người khác nếm, để mọi người cùng chia sẻ niềm vui thu hoạch của tôi.

Tôi đem nho tặng một người bạn làm kinh doanh. Anh ấy nhận lấy, dùng hai ngón tay nhón một quả bỏ vào miệng, nói: “Ngon, ngon,” rồi hỏi ngay: “Bao nhiêu tiền một cân?” Tôi nói không lấy tiền, chỉ muốn mời anh nếm thử. Anh ấy không chịu, nói không thể ăn không, nhất quyết trả tiền. Không còn cách nào, tôi đành nhận tiền của anh ấy.

Tôi đem nho biếu một vị lãnh đạo. Sau khi nhận nho, ông ấy cứ nhìn chằm chằm vào tôi rồi hạ giọng hỏi: “Cậu có việc gì cần giải quyết à?” Tôi nói mình chẳng có việc gì, chỉ muốn mời ông nếm thử nho mới của cây nho già nhà tôi. Ông ấy ăn nho, nhưng nhìn nét mặt thì thấy rõ ông ấy không tin lời tôi.

Tôi đem nho tặng cô hàng xóm xinh đẹp. Cô ấy hơi bất ngờ, còn chồng cô ấy thì càng tỏ vẻ cảnh giác. Tôi rất ngượng, vội nói đây là nho hái từ cây nhà mình, rất ngọt và ngon, muốn mời mọi người nếm thử. Người chồng ăn một quả như thể đang ăn thuốc độc. Không ngờ tối hôm đó từ nhà họ lại vọng ra tiếng cãi nhau.

Tôi đem nho cho một đứa trẻ ở nhà bên. Nó ăn xong còn muốn ăn nữa, trên mặt nở nụ cười ngọt ngào, miệng cũng ngọt ngào nói: “Nho này ngọt quá, cảm ơn chú.” Rồi nó nhảy chân sáo mang nho đi.

Tôi rất vui. Cuối cùng tôi cũng tìm được một người — một người thật sự chỉ đơn giản là ăn nho.`,
'b5_l07_t01': `Thời Trung Quốc cổ đại có một loại nhạc cụ gọi là “竽” (vu), âm thanh thổi ra rất hay. Nhà vua đặc biệt thích nghe.

Nhà vua có ba trăm người thổi vu. Ông thích nghe hòa tấu, luôn bảo cả ba trăm người cùng thổi; âm nhạc tuyệt đẹp khiến ông nghe say mê. Một hôm, có người tên Nam Quách tiên sinh ôm một cây vu đến gặp vua, khoác lác rằng: “Tôi cũng biết thổi vu, thổi chẳng kém bất kỳ ai trong số họ.” Nhà vua tin lời ông ta, nhận ông ta vào và cho người cấp cơm áo. Nam Quách tiên sinh không hề khách sáo, chỉ đòi đồ ngon để ăn, chọn đồ tốt để mặc, còn cây vu thì vứt sang một bên. Hóa ra ông ta hoàn toàn không biết thổi. Mỗi khi hòa tấu, Nam Quách tiên sinh ngồi trong ban nhạc, làm bộ như đang thổi vu để lừa vua, cứ thế ngày qua ngày sống nhờ vào tập thể.

Sau đó nhà vua qua đời, con trai lên làm vua. Vị vua mới cũng thích nghe thổi vu. Nhưng khác với cha mình, ông thích nghe độc tấu, không thích hòa tấu. Việc này làm Nam Quách tiên sinh hoảng sợ. Ông ta thấy mình không thể tiếp tục giả vờ được nữa, nên lén chuồn đi.`,
'b5_l07_t02': `Ngày xưa, có một người vừa bán giáo vừa bán khiên. Để thu hút khách, ông ta lớn tiếng rao: “Mau đến xem, mau đến coi, mau mua khiên và giáo của tôi!” Trước tiên ông ta giơ chiếc khiên lên nói: “Khiên của tôi đặc biệt chắc chắn, dù dùng cây giáo sắc bén đến đâu đâm cũng không thủng!” Sau đó ông ta lại hét lớn: “Mau đến coi, mau đến xem, không sắc thì không lấy tiền!” Vừa hét vừa giơ cây giáo lên, ông ta nói: “Các vị lại xem cây giáo của tôi đi, nó sắc vô cùng; dù chiếc khiên chắc chắn đến đâu, nó cũng đâm xuyên được!”

Người đứng bên cạnh nghe vậy thấy rất buồn cười. Một người bước ra hỏi: “Nếu chiếc khiên của ông chắc đến mức không gì đâm thủng được, còn cây giáo của ông lại sắc đến mức thứ gì cũng đâm xuyên được, vậy xin hỏi, nếu dùng giáo của ông đâm vào khiên của ông thì kết quả sẽ thế nào?”

Người bán giáo và khiên bị hỏi đến mức không nói nên lời.`,
'b5_l08_t01': `Triệu Hà trong lớp chúng tôi thông minh, xinh đẹp, hào phóng, cởi mở, là một cô gái ai gặp cũng mến. Tất nhiên tôi cũng rất thích cô ấy. Nhưng tôi chưa bao giờ nói với ai, cũng chưa từng bày tỏ gì với cô ấy. Đó là một bí mật trong lòng tôi, vì tôi biết người bạn thân Dư Huy của tôi cũng rất thích cô ấy.

Nhà Dư Huy và Triệu Hà ở gần nhau, mỗi lần Dư Huy đến tìm tôi chơi đều đưa Triệu Hà theo. Nhìn cô gái mình yêu nói cười vui vẻ với người bạn thân của mình, trong lòng tôi có một cảm giác khó tả, thường biểu hiện rất thiếu tự nhiên, vì vậy tôi luôn cố tránh ở cùng họ.

Đó là một buổi sáng mùa đông, trời rất lạnh. Tôi bị ốm nên không đi học, một mình ở nhà buồn chán. Bỗng có người gõ cửa. Tôi mở cửa thì thấy Triệu Hà, tay ôm một bó hoa đứng ngoài cửa, mặt lạnh đỏ bừng, mỉm cười hỏi: “Tôi vào được không?” Tôi mời cô ấy vào. Lời hỏi thăm thân thiết, nụ cười nhẹ nhàng, cộng với bó hoa ấy khiến tôi cảm động đến gần rơi nước mắt. Cả buổi sáng hôm đó tôi rất vui. Lần đầu tiên tôi nói nhiều như vậy với cô gái mình yêu. Tôi nghĩ, trong lúc không hay biết, tôi đã bộc lộ tình cảm của mình với cô ấy.

Một hôm, tôi bỗng phát hiện trong hộp thư điện tử có một bức thư. Mở ra xem thì là của Triệu Hà. Trong thư cô ấy nói cô ấy và Dư Huy chỉ là bạn bình thường, người cô ấy thật sự thích là tôi. Tôi lập tức vui đến nhảy lên. Nhưng trong niềm phấn khích lại có một nỗi buồn nhè nhẹ. Liền mấy đêm tôi trằn trọc không ngủ được. Tôi nghĩ rất nhiều, trong lòng vô cùng mâu thuẫn. Một bên là cô gái tôi yêu đã lâu, một bên là người bạn thân nhất; mất ai tôi cũng thấy sẽ là một điều rất đáng tiếc. Tôi phải làm sao đây?

Tôi viết thư trả lời Triệu Hà, nói cho cô ấy biết tâm trạng mâu thuẫn của mình.

Một tối thứ bảy, Dư Huy gọi điện bảo tôi đến nhà. Khi tôi tới, cậu ấy đã uống rất nhiều rượu, khóc và nói với tôi: “Tôi thất tình rồi, Triệu Hà không thích tôi. Hơn nữa cô ấy nói với tôi rằng cô ấy đã có bạn trai từ lâu.” Tôi lặng lẽ nhìn Dư Huy. Ngoài việc uống rượu cùng cậu ấy, tôi còn có thể làm gì?

Tin Triệu Hà có bạn trai nhanh chóng lan khắp lớp. Có người nói bạn trai cô ấy là nghiên cứu sinh của Đại học Ngoại giao, rất đẹp trai, học cũng rất giỏi, đang chuẩn bị ra nước ngoài du học. Họ nói như thật, nên các bạn trong lớp đều tin.

Sau đó Dư Huy có bạn gái mới. Tin Triệu Hà và tôi yêu nhau mới dần dần công khai.

Dư Huy hỏi tôi: “Hai người đến với nhau thế nào?” Tôi nói: “Bạn trai của Triệu Hà sau khi ra nước ngoài đã bỏ cô ấy, thế là chúng tôi đến với nhau.”

“Tôi đã sớm đoán tên đó chẳng phải thứ tốt lành gì rồi,” Dư Huy nói.

Bây giờ Triệu Hà đã trở thành vợ tôi, còn Dư Huy vẫn là người bạn thân nhất của tôi.`,
'b5_l09_t01': `Rốt cuộc hạnh phúc là gì? Ai có thể nói rõ được?

Không ai có thể nói rõ có bao nhiêu tiền, có quyền lực lớn đến mức nào mới được coi là có hạnh phúc; cũng không ai nói rõ có bao nhiêu con cái, bao nhiêu bạn bè thì mới là hạnh phúc; càng không ai nói rõ có bao nhiêu tình cảm mới là hạnh phúc… Bởi vì hạnh phúc hoàn toàn là cảm nhận mang tính cá nhân, mãi mãi không có một tiêu chuẩn thống nhất, cũng không có một tiêu chuẩn bất biến.

Thật ra hạnh phúc chỉ là một loại cảm giác cá nhân. Mỗi người chúng ta đều có thể có được hạnh phúc, chỉ cần trong lòng bạn có cảm giác hạnh phúc.

Tôi từng đọc một câu chuyện làm mình rất cảm động. Một tỷ phú lại có tình cảm sâu sắc với một viên kẹo. Hóa ra khi còn nhỏ gia đình ông rất nghèo, chưa từng được ăn kẹo. Có lần trên đường, một người tốt bụng cho ông một viên kẹo. Sau này nhớ lại cảnh ấy, ông nói lúc đó mình không biết hương vị ấy gọi là “ngọt”, chỉ cảm nhận được một niềm hạnh phúc chưa từng có. Về sau, cậu bé nghèo ấy dựa vào nỗ lực của bản thân trở thành người giàu có, đồng thời cũng trở thành một nhà từ thiện nổi tiếng.

Ông nói: “Mỗi lần giúp một người, tôi lại nhớ đến viên kẹo năm xưa và cảm kích người tốt bụng đã cho tôi kẹo. Một viên kẹo chỉ ngọt trong miệng, còn lòng tốt của người ấy lại ngọt tận trong tim tôi. Bây giờ dù ăn gì uống gì tôi cũng không còn cảm giác ngọt đến tận tim như ngày ấy. Chỉ khi làm nhiều việc thiện hơn, giúp đỡ người khác, đền đáp xã hội, tôi mới tìm lại được cảm giác của lần đầu ăn viên kẹo đó.” — Với ông, hạnh phúc là làm cho người khác sống tốt đẹp hơn.

Tôi có một người hàng xóm. Chồng cô ấy yêu một người phụ nữ khác và đề nghị ly hôn. Khi ly hôn, cô chỉ có một điều kiện: con trai phải do cô nuôi. Thu nhập của cô không cao, nhưng trên mặt lúc nào cũng có nụ cười, và nụ cười ấy không phải giả vờ. Để nuôi con, ngày nào cô cũng vất vả làm việc. Nhưng cô nói: “Tôi chưa bao giờ thấy khổ hay mệt. Chỉ cần nhìn thấy khuôn mặt cười của con trai, tôi cảm thấy mình là người hạnh phúc nhất thế giới.” — Với cô, hạnh phúc là nhìn thấy nụ cười của con trai.

Còn đối với tôi, hạnh phúc là gì? Là đọc được một cuốn sách hay, là trò chuyện với bạn bè về một chủ đề thú vị, là trích một phần nhỏ trong khoản thu nhập không nhiều của mình để quyên góp cho Dự án Hy vọng, là thấy những đứa trẻ phải bỏ học lại đeo cặp trở về trường, là thấy những người từng nghèo khó có cuộc sống tốt đẹp hơn, là thấy đất nước tôi ngày một giàu mạnh; tất nhiên còn là việc người mẹ già và cả gia đình đều khỏe mạnh, bình an, vui vẻ… Tất cả những điều ấy đều là hạnh phúc của tôi.

Hạnh phúc mãi mãi không có một tiêu chuẩn thống nhất. Chỉ cần trong lòng bạn cảm thấy hạnh phúc, bạn chính là một người hạnh phúc.`,
'b5_l10_t01': `Có một người làm việc ở một công ty thương mại, nhưng anh ta rất không hài lòng với công việc của mình. Một hôm, anh tức giận nói với bạn: “Sếp của tôi chẳng coi tôi ra gì. Hôm nào tôi sẽ đập bàn trước mặt ông ấy rồi nghỉ việc.”

“Cậu đã hiểu hoàn toàn nghiệp vụ của công ty mình chưa? Những kỹ năng làm thương mại quốc tế của họ cậu đã nắm rõ hết chưa?” người bạn hỏi ngược lại.

“Chưa!”

“Quân tử báo thù mười năm chưa muộn. Tôi khuyên cậu trước hết hãy nắm rõ toàn bộ kỹ năng thương mại, hồ sơ kinh doanh và cơ cấu tổ chức của họ. Ngoài việc sử dụng máy tính thành thạo, còn phải học lập trình, thậm chí những lỗi nhỏ của máy in, máy photocopy sửa thế nào cũng phải học. Sau đó hẵng nghỉ việc.” Người bạn khuyên: “Cứ coi công ty là nơi học miễn phí. Đợi đến khi thứ gì cũng học thông rồi hãy đi, chẳng phải vừa hả giận lại vừa thu hoạch được rất nhiều sao?”

Người ấy nghe theo lời khuyên của bạn. Từ đó anh chăm chỉ học tập, thậm chí sau giờ làm vẫn ở lại văn phòng làm thêm, thường xuyên thức khuya luyện viết các loại văn bản thương mại.

Một năm sau, người bạn tình cờ gặp lại anh, liền nói: “Bây giờ chắc cậu đã học được gần hết rồi, có thể chuẩn bị nghỉ việc được rồi chứ?”

“Nhưng tôi phát hiện nửa năm nay sếp nhìn tôi bằng con mắt khác, gần đây còn giao cho tôi trọng trách, vừa thăng chức vừa tăng lương. Tôi đã trở thành người được coi trọng trong công ty rồi!”

“Điều này tôi đã đoán từ lâu!” người bạn cười nói. “Lúc đầu sếp không coi trọng cậu là vì năng lực của cậu chưa đủ mà cậu lại không chịu cố gắng học. Sau này cậu chăm chỉ học tập, tất nhiên ông ấy sẽ nhìn cậu bằng con mắt khác.”

Chỉ biết oán trách thái độ của lãnh đạo mà không chịu cố gắng nâng cao năng lực bản thân là căn bệnh khá nhiều người thường mắc phải.`,

'b6_l14_t01': `Có lần tôi hỏi một người bạn: “Hai vợ chồng anh ai là người làm chủ gia đình?”

“Tất nhiên là tôi rồi,” anh bạn kiêu hãnh trả lời. “Nhà tôi có một quy định: việc nhỏ do vợ quyết định, việc lớn đều do tôi làm chủ.”

“Việc nào là việc nhỏ, việc nào được coi là việc lớn?”

“Việc nhỏ chính là những vấn đề kinh tế trong nhà, chẳng hạn nên mua gì, nên làm gì… Còn việc lớn thì nhiều lắm, ví dụ ai sẽ làm tổng thống Mỹ nhiệm kỳ tới, bao giờ người Trung Quốc có thể lên Mặt Trăng, loài người sẽ chuyển lên Sao Hỏa sống thế nào… Những việc lớn ấy đều do tôi suy nghĩ.”`,
'b6_l14_t02': `Một gia đình ba người chuyển vào nhà mới. Người vợ thấy chồng và con trai không mấy chú ý vệ sinh, thường làm nhà cửa bừa bộn, liền viết một khẩu hiệu trong nhà: “Giữ gìn vệ sinh, mọi người đều có trách nhiệm”, muốn nhắc chồng và con giữ vệ sinh. Con trai tan học về, thấy khẩu hiệu liền cầm bút sửa thành: “Giữ gìn vệ sinh, người lớn có trách nhiệm”. Ngày hôm sau, người chồng nhìn thấy cũng lấy bút sửa thành: “Giữ gìn vệ sinh, phu nhân có trách nhiệm”.`,
'b6_l14_t03': `Chuông cửa nhà bà Trương bị hỏng. Bà gọi điện cho công ty quản lý bất động sản. Người phụ trách nói sẽ lập tức cử thợ đến sửa và hỏi địa chỉ nhà bà Trương. Người thợ theo địa chỉ, nhanh chóng đạp xe tới, nhưng chẳng bao lâu đã quay về. Người phụ trách thấy anh ta liền hỏi: “Nhanh thế đã sửa xong rồi à?” Người thợ đáp: “Chưa. Tôi đã đến nhà họ, nhưng đứng ngoài cửa bấm chuông mãi mà không ai ra mở cửa, nên tôi đành quay về.”`,
'b6_l14_t04': `Đầu năm học mới, sinh viên khóa trên chúng tôi ra ga đón sinh viên mới. Tôi thấy một nữ sinh xinh xắn đứng cạnh một chiếc va-li lớn, lúng túng không biết làm sao, nên chủ động tiến lên giúp cô ấy vác va-li. Không ngờ chiếc va-li rất nặng, tôi lại ngại đặt xuống, đành gắng sức chịu. Đi chưa bao xa đã mồ hôi nhễ nhại. Cô gái liền nói với tôi: “Vác không nổi thì lăn đi.” Nghe vậy, tôi lập tức nổi giận, đặt va-li xuống và nhìn cô ấy. Cô gái sững người một chút rồi đỏ bừng mặt, chỉ vào đáy va-li nói: “Ý tôi là cái bánh xe.”`,
'b6_l14_t05': `Giáo sư Lữ rất nghiên cứu chữ Hán. Một hôm trên lớp, ông hào hứng nói với sinh viên: “Chữ Hán có rất nhiều chữ tượng hình. Ví dụ chữ ‘吕’ của họ tôi, thời cổ có nghĩa là hôn nhau. Các em xem, miệng đối miệng, hình tượng biết bao!” Một sinh viên đứng dậy hỏi: “Thưa thầy, nếu chữ ‘吕’ nghĩa là hôn nhau, vậy chữ ‘品’ phải giải thích thế nào? Ba người cùng hôn nhau ạ?”

Giáo sư đang định nổi giận thì một sinh viên khác lại đứng lên nói: “Em thấy chữ ‘品’ còn dễ giải thích, vậy chữ ‘器’ thì sao? Bốn người và một con chó đang làm gì ạ?” Cả lớp lập tức cười ầm lên.

Giáo sư Lữ quăng sách xuống, tức tối xách cặp bỏ đi.`,
'b6_l15_t01': `Bạn bè thường hỏi tôi một câu như thế này: chuyến du học Trung Quốc lần này cho bạn cảm nhận gì? Ấn tượng của bạn về nơi đó ra sao? Mỗi khi họ hỏi như vậy, tôi đều không do dự trả lời: chuyến du học này để lại trong tôi ấn tượng rất sâu sắc và rất nhiều ký ức đẹp. Qua những người tôi đã tiếp xúc, phần lớn họ đều có tấm lòng lương thiện, nhiệt tình với người khác và sẵn lòng giúp đỡ.

Tất nhiên, ở bất kỳ quốc gia hay khu vực nào trên thế giới cũng có người tốt người xấu. Tôi không dám nói người ở đây ai cũng tốt, nhưng tôi muốn kể với mọi người một trải nghiệm của chính mình. Có lẽ qua đó bạn sẽ hiểu họ là những người như thế nào.

Tôi vốn không thích vận động, hơn nữa khi còn ở trong nước chưa bao giờ đạp xe ra đường, nên sau khi đến Trung Quốc, mỗi lần đi xe đạp ra phố tôi đều lo ngay ngáy.

Lần này thì thật sự xảy ra chuyện.

Hôm đó tôi đạp xe đến nhà triển lãm. Trên đường về phải đi qua một đường ray. Không biết thế nào, bánh xe mắc vào giữa đường ray, tôi ngã nhào xuống. Tôi còn chưa kịp hiểu chuyện gì xảy ra thì mọi người đã lập tức cẩn thận đỡ tôi dậy. Có người còn chặn một chiếc xe để đưa tôi đến bệnh viện, mọi người cùng xúm vào đỡ tôi lên xe. Người tài xế cũng rất nhiệt tình, trên đường thỉnh thoảng quay lại nhìn tôi, không ngừng an ủi. Đến bệnh viện, anh cẩn thận cõng tôi vào phòng cấp cứu. Bác sĩ lập tức khám và điều trị. Sau khi kiểm tra, bác sĩ nói xương cẳng chân của tôi bị gãy và bó bột cho tôi. Mang theo tâm trạng đau đớn, tôi ngồi xe trở về trường.

Thầy cô và bạn bè nghe tin đều đến thăm. Cô Lâm của lớp tôi thấy tôi nằm trên giường không cử động được thì nhất quyết bắt tôi sang nhà cô ở. Ban đầu tôi sợ làm phiền cô nên không chịu. Nhưng cô nói: “Nhất định đừng khách sáo, cứ coi nhà cô như nhà của em.” Vì cô khuyên đi khuyên lại, tôi đành đồng ý.

Ở nhà cô, cô chăm sóc tôi chu đáo như con gái của mình, lo ăn lo uống cho đến khi vết thương lành và tôi có thể đi lại tự do.

Mỗi khi nhớ lại chuyện ấy, từ tận đáy lòng tôi đều biết ơn những con người mà mình thậm chí không biết tên. Tinh thần sẵn lòng giúp đỡ người khác của họ khiến tôi mãi không quên.`,
'b6_l16_t01': `Khi mới đến Trung Quốc tôi mới mười tám tuổi. Vì còn nhỏ nên chẳng hiểu gì nhiều. Tôi có một tật là hễ sốt ruột thì tim đập nhanh, hơn nữa đập rất mạnh. Tôi nghĩ có lẽ tật này liên quan đến tính cách dân tộc. Ở nước tôi, câu mọi người thích nói nhất là: “Nhanh lên, nhanh lên!” Suốt mười tám năm, câu tôi nghe nhiều nhất cũng là “Nhanh lên! Nhanh lên!” Có thể nói tôi lớn lên dưới sự thúc giục của câu nói ấy. “Nhanh lên” gần như đã trở thành câu cửa miệng của chúng tôi.

Nhưng chẳng bao lâu sau khi đến Trung Quốc, tôi phát hiện rất ít người nói “nhanh lên”. Trái lại, câu thường nghe nhất lại là: “Chậm một chút!” Tôi thấy lạ và cũng không hiểu. Tôi cho rằng “chậm” tức là “lười”. Thế là tôi nghĩ: sao người ở đây “lười” thế nhỉ?

Sau đó một chuyện đã làm thay đổi cách nhìn của tôi.

Đó là mùa đông năm ngoái. Một người bạn ở Đại học Thanh Hoa gọi điện rủ tôi đến chơi. Vừa đặt điện thoại xuống tôi đã vội vã đạp xe đi. Nhưng đến cổng Thanh Hoa thì xe bị hỏng. May mà gần đó có một cửa hàng sửa xe, tôi đẩy xe vào. Người thợ bên trong đang sửa xe cho một cụ già. Vừa bước vào tôi đã gọi lớn: “Bác thợ ơi, xe đạp của tôi hỏng rồi, mau sửa giúp tôi với.” Tôi nói một hơi. Người thợ chỉ nhìn tôi một cái, chẳng nói gì, tiếp tục sửa chiếc xe đang làm. Tôi nhìn đồng hồ, thời gian không còn sớm, sốt ruột vô cùng. Tôi lại nói: “Bác không thể nhanh hơn một chút sao?” Lần này ông quay lại nhìn tôi rồi nói: “Đừng vội. Cô không thấy tôi đang sửa xe cho người khác à? Ở đây đâu chỉ có một mình cô, phải có người đến trước người đến sau chứ. Cô chờ một lát, tôi sửa xong cho bác này rồi lập tức sửa cho cô.” Tôi đành chờ.

Mãi mới đợi đến khi ông sửa xong chiếc xe kia. Ông lau tay, bước sang hỏi tôi: “Rốt cuộc hỏng chỗ nào?” Tôi nói: “Đạp không chạy.” Ông xem xe, cầm dụng cụ, tháo lốp ra và nói: “Có thể lốp bị thủng.” Ông bơm hơi rồi nhúng lốp vào một chậu nước, cẩn thận kiểm tra. Ông làm vừa chậm vừa kỹ, còn thở dài một tiếng, có lẽ cái lỗ rò hơi rất khó tìm.

Thấy dáng ông chậm rãi như vậy, tôi lại sốt ruột: “Sao bác chậm thế, nhanh lên một chút không được à?” Ông ngừng tay và nói: “Cô ơi, cô đã nói ba lần rồi. Chẳng lẽ tôi không muốn nhanh sao?” Tôi không hiểu ý ông, chỉ biết trừng mắt nhìn. Thấy tôi tức giận, ông mỉm cười rồi từ tốn nói: “Cô muốn tôi sửa xe cho tốt, hay muốn tôi làm qua loa cho nhanh rồi đuổi cô đi?” Lúc ấy tôi mới hiểu, không thúc ông nữa, còn bắt chước giọng người Bắc Kinh nói: “Thôi được, bác cứ từ từ mà làm!”

Sau khi sửa xong lốp, ông còn kiểm tra kỹ các bộ phận khác rồi mới hài lòng nói: “Xong rồi!” Khi tôi bước ra khỏi cửa hàng, ông lại dặn: “Ngoài trời có tuyết, đường trơn, đi xe chậm một chút nhé!” Nhìn mặt đất trắng xóa, nghe câu nói ấy, lòng tôi lập tức cảm thấy ấm áp.

Sau này tôi còn thường xuyên nghe những câu thân thiết như “Đi chậm thôi!”, “Từ từ đến, đừng vội!”. Cuối cùng tôi hiểu ra: trong những câu ấy làm gì có ý dạy người ta lười biếng? Rõ ràng đó là lời dặn dò như của người thân!

Một câu “chậm một chút” không chỉ có ý nhắc làm việc phải nghiêm túc và có trách nhiệm, mà còn chứa đựng sự quan tâm và yêu thương chân thành dành cho người khác.`,
'b6_l17_t01': `Trước khi tốt nghiệp đại học, tôi một lòng muốn thi cao học nhưng lại không đỗ. Vốn luôn tự tin trong học tập, sau cú đả kích nặng nề ấy tôi không còn dám quá tự tin vào bản thân nữa.

Một thời gian, tâm trạng tôi rất tệ, thường tự nhốt mình trong phòng, không muốn gặp ai, cũng không muốn nói gì.

Một hôm khi đến trường nhận bằng tốt nghiệp, tôi thấy cạnh cổng trường dán một thông báo tuyển dụng. Lại gần xem thì là một trường trung học trong thành phố cần tuyển một giáo viên tiếng Anh. Điều kiện là tốt nghiệp đại học trở lên, thành tích tiếng Anh tốt và khẩu ngữ tốt.

Tôi bỗng muốn thử. Suốt bốn năm đại học, thành tích tiếng Anh của tôi luôn rất tốt. Hơn nữa đã tốt nghiệp rồi, cũng đến lúc tìm một công việc. Thế là tôi đăng ký.

Lúc đó ngày dạy thử đã gần. Về nhà tôi bận soạn giáo án, luyện khẩu ngữ theo máy ghi âm. Đến ngày trước buổi dạy thử, tôi đã có thêm vài phần tự tin.

Ngày hôm sau, hiệu trưởng đưa tôi đến cửa lớp. Ông nói: “Chúng tôi khá hài lòng về cô. Đây là cửa ải cuối cùng. Nhớ phải bình tĩnh.”

Tôi nhìn vào lớp, bên trong đầy những học sinh chỉ nhỏ hơn tôi vài tuổi. Thấy giáo viên mới đến, tất cả dừng việc đang làm và lập tức nhìn về phía tôi. Tim tôi đập thình thịch.

Tôi không phải là cô gái mạnh dạn, nhưng vì buổi dạy thử này tôi thực sự đã chuẩn bị rất đầy đủ. Tôi nghĩ có chuẩn bị rồi thì sẽ không quá căng thẳng.

Bước lên bục giảng, tôi cảm thấy mình toát mồ hôi. Cô lớp trưởng ngồi hàng đầu hô một tiếng “Đứng lên!”, khiến tôi gần như lập tức quên mất lời mở đầu.

Khi một người đã quen với một vai trò, nếu một ngày đột nhiên đổi sang vai trò khác thì ít nhiều đều sẽ không thích nghi.

Tôi vội bảo các em ngồi xuống. Lúc ấy tôi nghe tiếng mấy nam sinh cười. Chỉ trong khoảnh khắc, giáo án hôm qua thuộc rất kỹ bỗng nhiên quên sạch.

Mấy chục giây trôi qua, tôi vẫn không tìm được lời để nói. Tôi thử giảng vài câu, ngay cả mình cũng không biết đang nói gì.

Tôi biết lần này coi như xong. Trong lòng đã bắt đầu muốn bỏ cuộc: thà sớm tìm một cái cớ để bước xuống còn hơn tiếp tục làm trò cười trên bục giảng.

“Các em, cô rất muốn dạy các em, nhưng cô tệ quá, cô không thể làm lỡ việc học của các em…” Nói xong, tôi áy náy nhìn hiệu trưởng ngồi hàng sau đang lo lắng cho mình, rồi định nhanh chóng chạy ra ngoài.

“Cô ơi, cô chờ một chút!” Cô lớp trưởng hàng đầu gọi tôi lại.

“Cô ơi, thử lại một lần nữa được không?”

“Cô… cô không làm được.”

“Cô thử đi. Cô làm được mà, thử lại một lần nữa nhé?”

Mấy nữ sinh phía sau cũng nói: “Cô ơi, cô thử lại lần nữa đi!”

Lúc ấy lớp học rất yên tĩnh, mấy nam sinh lúc nãy cười tôi cũng ngồi ngay ngắn. Hiệu trưởng cũng mỉm cười gật đầu với tôi.

Hơn bốn mươi học sinh trong sáng đáng yêu, hơn bốn mươi trái tim ngây thơ, hơn bốn mươi đôi mắt chân thành, lúc đó giống như một dòng nước ấm sưởi ấm và động viên tôi. Bỗng nhiên tôi cảm thấy mình có thật nhiều điều muốn nói với các em, có rất nhiều câu chuyện muốn kể. Tôi nghĩ mình không thể rời bục giảng ấy, nếu không có lẽ tôi sẽ không bao giờ tìm được một cơ hội lý tưởng như vậy nữa.

Tôi đứng vững trước bàn giáo viên. Tiết học tiếp theo tôi giảng rất tốt.

Đối diện với những học sinh khao khát tri thức, chân thành và lương thiện thì có gì đáng sợ đâu!

Sau này cô lớp trưởng ấy trở thành học sinh mà tôi tự hào nhất và cũng là người bạn tốt nhất. Cô ấy nói với tôi: “Cô ơi, ngày trước khi tranh cử lớp trưởng em từng ba lần lên bục. Lần đầu em không dám nói lấy một câu, lần thứ hai mặt đỏ tim đập nhanh, lần thứ ba em nhận được những tràng vỗ tay nhiệt liệt nhất. Sau mỗi lần thất bại em đều tự động viên mình: ‘Thử lại một lần nữa.’”

Có những câu rất đơn giản, rất mộc mạc nhưng có thể khiến người ta được lợi cả đời. Đặc biệt khi vừa bước vào xã hội, chúng ta càng cần thử một lần, rồi lại thử thêm một lần nữa.`,
'b6_l18_t01': `Nói ra thì chuyện đã xảy ra từ nhiều năm trước.

Năm ấy tôi đang học đại học. Một buổi tối, khi tôi vừa định khóa cửa ký túc xá để đi ra ngoài, chị gái vội chạy tới, đưa cho tôi một hộp bánh sinh nhật. Chị nói vốn định tổ chức cho tôi một buổi sinh nhật, nhưng vừa nhận thông báo phải đi công tác tối nay nên không còn thời gian. Vì tôi cũng có việc gấp phải đi, nên thuận tay đặt hộp bánh lên chiếc bàn gần cửa. Đó là bàn của Lưu Tây Tây.

Sau giờ tự học buổi tối, tôi về ký túc xá thì trong phòng rất náo nhiệt. Tám chín cô gái vây quanh Lưu Tây Tây, ai cũng cầm một miếng bánh vui vẻ ăn. Tôi bỗng nhớ đến chiếc bánh chị tặng, nhưng còn chưa kịp hiểu chuyện gì thì Tây Tây đã kéo tay tôi, phấn khích nói: “Tớ vui quá! Không ngờ có người biết hôm nay là sinh nhật tớ, còn đặc biệt gửi một hộp bánh đến. Trên bánh có hoa và chữ rất đẹp, tiếc là cậu về muộn nên không thấy…” Tôi lập tức sững người. Tây Tây đưa cho tôi một miếng bánh: “Mọi người đều nói không biết ai gửi bánh. Cậu là người cuối cùng rời ký túc xá, tớ đoán chắc cậu nhìn thấy. Nói cho tớ biết, người ấy là nam hay nữ?” Lúc đó có người đùa: “Chắc chắn là nữ. Tây Tây nhà mình xấu thế này, làm gì có con trai thích chứ!” Trên mặt Tây Tây thoáng vẻ thất vọng. Cô ấy lắc vai tôi: “Nói đi mà! Nói đi mà!” Khoảnh khắc ấy tôi gần như muốn hét lên: bánh này là chị gái tớ tặng cho tớ! Nhưng nhìn những gương mặt đang vui vẻ và ánh mắt đầy mong đợi của Tây Tây, tôi không nỡ làm mọi người mất vui, càng không nỡ làm Tây Tây bẽ mặt. Vì vậy tôi đành thuận theo sai lầm mà nói dối: “Là một chàng trai rất đẹp trai!” “Hay quá!” Theo tiếng reo của Tây Tây, mọi người cùng vỗ tay. Có người nói: “Chắc chắn là ai đó đang lén thích cậu!” Tây Tây cười.

Nửa đêm, Tây Tây đánh thức tôi, khẽ hỏi: “Chàng trai ấy có phải cùng khóa với chúng mình không?” Tôi lắc đầu. Cô ấy lại hỏi: “Có phải người trường mình không?” Tôi đành giải thích: “Trời tối quá, tớ không nhìn rõ mặt.”

Trong mấy tuần sau, chủ đề chính vào cuối tuần trong phòng ký túc xá đều xoay quanh chàng trai đã gửi bánh cho Tây Tây. Dù chẳng bàn ra được kết quả gì, nhưng lại cho chúng tôi một đề tài thú vị.

Dần dần, chúng tôi đều quên chuyện ấy. Chỉ thỉnh thoảng có người hỏi Tây Tây: “Chàng trai bí ẩn ấy có tin tức gì chưa?” Tây Tây lúc nào cũng lắc đầu, còn cố ý thở dài.

Một ngày trước khi tốt nghiệp, Tây Tây ngồi một mình bên cửa sổ, trong tay cầm một dải lụa màu hồng. Có lẽ ngoài Tây Tây ra, chỉ còn tôi nhớ đó chính là dải lụa trên hộp bánh sinh nhật của tôi. Nhìn dáng cô ấy, tôi rất muốn nói ra sự thật để cô ấy thôi hy vọng, nhưng thế nào cũng không mở miệng được.

Sau đó Tây Tây theo gia đình ra nước ngoài. Tôi quyết tâm nói sự thật. Nhưng khi nhìn dải lụa màu hồng cô ấy buộc trên tóc, lòng tôi lập tức lại mềm xuống. Sự mong đợi rất riêng của một cô gái trẻ mà cô ấy bộc lộ khiến tôi vô cùng cảm động. Cuối cùng tôi vẫn không nói gì, tiếp tục để sai lầm ấy tồn tại, để cô mang theo giấc mơ ngọt ngào này lên máy bay, bay về một tương lai không thể biết trước…

Sáu năm sau, Tây Tây đã là mẹ của hai đứa trẻ. Chồng cô ấy là một người Mỹ gốc Hoa. Tất nhiên sau này cô cuối cùng cũng biết chuyện “chàng trai” tặng bánh chỉ là một hiểu lầm đẹp. Nhưng cô không trách tôi. Trái lại, cô cảm ơn tôi vì đã cho cô một ký ức đẹp. Cô còn nói khi con gái mình mười tám tuổi, cô sẽ kể chuyện này như một câu chuyện vui đẹp đẽ cho con nghe…

Hóa ra không phải mọi sai lầm đều để lại nuối tiếc. Có lúc cứ để một sai lầm tiếp tục, lại có thể tạo nên một câu chuyện đẹp.`,
'b6_l19_t01': `Một tai nạn nhiều năm trước đã biến tôi từ một người bình thường thành người khuyết tật. Những đổi thay ấm lạnh trong cách con người đối xử với nhau thường khiến tôi rơi nước mắt. Nói thật lòng, tôi đã có phần thất vọng về bản tính con người, đặc biệt là khi bị phân biệt đối xử trong lúc tìm việc. Tôi gần như mất hết dũng khí xin việc, nhưng vì cuộc sống lại không thể không đi tìm việc hết lần này đến lần khác, liên tiếp chịu những cú đả kích vì bị từ chối.

Sau đó, cuối cùng tôi vào được một tòa soạn báo, phụ trách quản lý tư liệu. Công việc này không chỉ rất phù hợp với tôi mà tôi còn có thể đảm nhiệm tốt. Đồng nghiệp đối với tôi cũng rất thân thiện và quan tâm, khiến tôi lại tràn đầy niềm tin vào cuộc sống.

Có một lần xảy ra sự kiện lớn, đồng nghiệp bận rộn chạy đua để lấy tin, công việc của tôi bỗng trở nên vô cùng quan trọng. Vì mọi người cần tư liệu rất gấp, trong khi việc tôi bị câm điếc lại gây khó khăn cho công việc. Điều này không chỉ làm chậm thời gian quý báu mà còn khiến tôi mắc không ít sai sót.

Sau đó, sự bất mãn của đồng nghiệp khiến lãnh đạo đơn vị buộc phải suy nghĩ lại xem rốt cuộc tôi có phù hợp tiếp tục làm việc ở đây hay không. Vì vậy có người đề nghị chuyển tôi khỏi tòa soạn. Điều đó không chỉ vì đơn vị mà cũng là vì tốt cho tôi. Nhưng tôi thật sự không nỡ rời công việc mình yêu thích. Tôi chạy đến gặp lãnh đạo, bảo đảm rằng mình có thể học nghiêm túc và có thể tăng tốc độ làm việc.

Từ ánh mắt và nét mặt của lãnh đạo, tôi không nhìn ra ông có thái độ thế nào. Nhưng tôi nghĩ chắc ông không thể để tôi tiếp tục ở đây nữa. Đó là một cú đả kích nặng nề đối với tôi. Vì lòng nghi ngờ, tôi cảm thấy đồng nghiệp không còn nhiệt tình như trước. Trước đây họ có hoạt động gì cũng gọi tôi tham gia, nhưng gần đây tối thứ hai, thứ tư và thứ sáu hằng tuần họ đều có hoạt động ngay tại văn phòng mà hoàn toàn không báo cho tôi. Tôi cũng cố ý giả vờ không biết. Một hôm tôi thật sự không kiềm chế được nữa, liền nhân lúc họ đang hoạt động, giả vờ vào văn phòng lấy đồ.

Khi tôi mở cửa lớn, họ đều giật mình, còn tôi càng kinh ngạc hơn. Hóa ra họ không đánh bài hay tổ chức khiêu vũ, mà mời một giáo viên ngôn ngữ ký hiệu đến dạy họ. Không chỉ tất cả đồng nghiệp đều có mặt, ngay cả lãnh đạo cũng ở đó.

Để giải quyết khó khăn trong việc giao tiếp với tôi khi làm việc, các đồng nghiệp đã từ bỏ thời gian nghỉ sau giờ làm, nghiêm túc học ngôn ngữ ký hiệu để phối hợp với công việc của tôi. Để tôi không bị chuyển đi, họ đã bỏ ra biết bao tâm sức.

Lần đầu tiên, tôi nhận ra sự thiếu hiểu biết của chính mình, đồng thời nhận ra sự cao đẹp và vẻ đẹp của con người; cũng là lần đầu tiên tôi rơi những giọt nước mắt không phải vì buồn tủi mà vì biết ơn.`,
'b6_l20_t01': `Bành Nghệ Vân là một sinh viên Trung Quốc đang du học ở Anh. Một hôm cô đến Đại học Oxford phỏng vấn, ăn mặc rất giản dị và cũng không đeo trang sức. Bạn cô khuyên: “Cậu đi thi vào Oxford, trường đại học quý tộc nổi tiếng nhất thế giới, lại còn phải phỏng vấn với giáo sư Agar nổi tiếng thế giới, ăn mặc thế này làm sao tạo ấn tượng đầu tốt cho người ta?”

“Vốn dĩ tôi đâu phải quý tộc, việc gì phải giả ra vẻ quý tộc? Hơn nữa, thi đỗ hay không dựa vào kiến thức và năng lực, không phải quần áo.” Sự tự tin của cô khiến người bạn thấy rất có lý. Tuy nhiên, điều khiến người ta kinh ngạc là trong buổi phỏng vấn cô lại tranh luận với giáo sư Agar, khiến giáo sư rất tức giận.

“Cô nghĩ cô có thể thuyết phục tôi sao?” giáo sư lớn tiếng hỏi.

“Chưa chắc, bởi khi tôi còn chưa ra đời, ngài đã là bác sĩ tâm lý rồi.” Bành Nghệ Vân không hề chịu lép vế. “Nhưng có thể làm thí nghiệm. Nếu không có ai làm những thí nghiệm này thì mãi mãi cũng không ai biết giữa ngài và tôi ai đúng ai sai.”

“Đây là phương án thí nghiệm của cô à? Tôi lập tức có thể chỉ ra vài lỗi.”

“Điều đó chỉ chứng tỏ phương án thí nghiệm còn chưa hoàn thiện. Nếu ngài nhận tôi làm học trò, đương nhiên có thể sửa nó tốt hơn.”

“Cô muốn tôi hướng dẫn một nghiên cứu sinh phản đối tôi sao?”

“Vâng, tôi nghĩ như vậy.” Cô mỉm cười. “Nhưng sau khi tranh luận với ngài, tôi biết Oxford chắc chắn không thể nhận tôi nữa.”

“Vì sao cô chọn môn ‘trị liệu hành vi’? Và vì sao chọn tôi làm người hướng dẫn?”

“Trong sách ngài từng viết: ‘Mục đích của trị liệu hành vi là giúp những người đau khổ về tâm hồn trở lại cuộc sống bình thường, từ đó được hưởng niềm hạnh phúc và quyền lợi mà người bình thường có.’ Nói thật, tôi không hoàn toàn tán thành tất cả lý luận trong sách của ngài, nhưng tôi đồng ý với câu này. Tôi nghĩ bất đồng giữa chúng ta chỉ là làm thế nào để làm tốt hơn, làm sao điều trị bệnh nhân tốt hơn.”

“Cảm ơn cô Bành, cô có thể đi.”

“Cảm ơn giáo sư Agar, tạm biệt!”

Bành Nghệ Vân rất mong được làm nghiên cứu sinh của giáo sư Agar. Vì Agar không chỉ là giáo sư tâm lý học nổi tiếng quốc tế, mà nghiên cứu sinh của ông đều có học bổng. Bành Nghệ Vân không đủ khả năng trả mấy nghìn bảng học phí, buộc phải giành được học bổng, nếu không cô không thể tiếp tục học. Nhưng Agar yêu cầu sinh viên rất nghiêm, chọn đi chọn lại, bốn năm năm mới nhận một hai người. Bạn bè lo cho cô, trách cô không nên tranh luận với giáo sư: “Học bổng quan trọng với cậu như vậy, cậu lại biết rõ giáo sư Agar rất nghiêm, tại sao còn tranh luận với ông ấy?”

Cô cười nói: “Nếu cậu không yêu một cô gái, cậu có thể vì tiền mà nói rằng mình yêu cô ấy không?”

“Đương nhiên rất khó,” người bạn thừa nhận, “nhưng cậu…”

“Vậy trong khoa học, trái với lương tâm mà tán thành một lý luận mình cho là sai thì còn khó hơn. Nếu lừa dối trong tình yêu, người bị lừa chỉ là một người; nhưng nếu lừa dối trong khoa học, chỉ vì tiền mà không kiên trì quan điểm đúng, người bị hại sẽ là hàng nghìn hàng vạn bệnh nhân. Tôi nghĩ nếu mình làm như vậy, cả đời này tôi sẽ chịu sự lên án của lương tâm.” Cô nói: “Đối với một người làm nghiên cứu khoa học, điều quan trọng nhất là dám kiên trì chân lý, dám giữ quan điểm của mình. Tất nhiên cũng phải dám sửa sai.”

Kết quả phỏng vấn đã có.

Đại sảnh chật kín người. Thư ký tuyên bố: “Người giành được tư cách nghiên cứu sinh tiến sĩ của giáo sư Agar là cô Bành Nghệ Vân, sinh viên Đại học London đến từ Trung Quốc!”

Giáo sư Agar đứng dậy, bước đến trước mặt Bành Nghệ Vân và nói trước mọi người: “Con thấy đấy, con đã tranh luận với tôi hai tiếng đồng hồ nhưng tôi vẫn quyết định nhận con. Con biết vì sao không? Tôi thích sự chân thành và thẳng thắn của con, cũng trân trọng lòng dũng cảm của con. Tôi muốn con làm nghiên cứu sinh của tôi để dưới sự hỗ trợ của tôi, con có thể hết mình phản đối lý luận của tôi. Nếu sự thật chứng minh con sai, tất nhiên tôi sẽ vui; nếu cả hai chúng ta đều đúng, tôi càng vui; nếu con đúng còn tôi sai — ha! Con không thể tưởng tượng tôi sẽ vui đến mức nào đâu! Đúng là khi con chưa ra đời tôi đã là một nhà tâm lý học, nhưng tôi hy vọng đến khi tôi qua đời, con có thể trở thành một nhà tâm lý học giỏi hơn, xuất sắc hơn tôi. Chỉ như vậy thế giới mới có hy vọng.”

Bành Nghệ Vân vô cùng xúc động.

Cuối cùng cô đã thực hiện được nguyện vọng của mình, trở thành nghiên cứu sinh tiến sĩ của giáo sư Agar và bước vào Đại học Oxford mà cô hằng mơ ước.`,
'b6_l21_t01': `Đó là một ngày chủ nhật. Tôi đạp xe vào thành phố dạo hiệu sách. Bên cạnh hiệu sách có một tiệm làm tóc mới khai trương, trang trí rất đẹp. Thợ làm tóc là một cô gái xinh đẹp, trông như minh tinh điện ảnh. Tuy tóc tôi vẫn chưa dài lắm, tôi vẫn bất giác bước vào.

“Anh đến rồi, mời vào trong ngồi.” Cô gái nhiệt tình mời tôi vào như gặp người thân. Trong phòng có một chiếc gương lớn, vài chiếc ghế xoay, mọi thứ được dọn dẹp sạch sẽ tinh tươm.

Tôi ngồi xuống một chiếc ghế xoay để cô ấy cắt tóc. Qua tấm gương lớn, nhìn cô ấy bận rộn quanh mình, tôi thấy dễ chịu vô cùng. Khi gội đầu, tay cô ấy rất nhẹ nhàng, tạo cảm giác rất thoải mái.

Gội xong, cô cầm lược và kéo, cắt “lách cách”.

Bỗng tai phải tôi nóng lên, cô ấy kêu thất thanh: “Ôi, không xong rồi, em cắt vào tai anh rồi!”

Tôi giật mình. Quả nhiên có máu, một giọt còn rơi xuống tấm khăn choàng trắng.

Cô ấy cuống đến muốn khóc: “Làm sao bây giờ? Hôm nay là ngày đầu khai trương, ở đây em còn chưa có thuốc cầm máu.”

Tôi đứng dậy, nhìn trong gương thấy tai phải chỉ có một vết nhỏ đang chảy máu, lúc ấy trái tim như treo ở cổ mới trở về chỗ cũ. Tôi cười, lấy khăn giấy ấn vào vết thương và nói: “Không sao, một lát là khỏi thôi.”

Máu ngừng chảy. Cô gái đỏ mặt, liên tục nói: “Xin lỗi, hôm nay là ngày đầu mở cửa, em căng thẳng quá.”

Tôi nhìn ra cô ấy nói thật. Quả thực lần đầu làm ăn ai mà chẳng tránh khỏi sai sót, huống chi là một cô gái trẻ? Khi tôi lần đầu làm phóng viên, cứ tưởng đã sửa bản thảo từng chữ từng câu đến hoàn hảo, cuối cùng chẳng phải tổng biên tập vẫn tìm ra một chữ viết sai sao?

Tôi an ủi: “Không sao, không sao. Cứ coi lần này là thử nghiệm đi, luyện tay nghề trên đầu tôi. Nào, cắt tiếp nhé.”

Cô ấy cảm động nói: “Anh thật là người tốt.”

Cắt xong, cô nhất quyết không lấy tiền. Tôi nói sao thế được. Đang nhường qua nhường lại thì một chàng trai vào cắt tóc hỏi tôi: “Ở đây thế nào?”

Tôi nói: “Không tệ!”

Cô gái nhìn tôi đầy biết ơn.

Nhân lúc cô ấy tiếp chàng trai, tôi lặng lẽ để tiền lại rồi rời tiệm.

Ánh nắng thật đẹp, tâm trạng tôi cũng ấm áp như nắng. Xem ra làm một chút việc tốt cho người khác cũng chẳng khó.

Ai ngờ về đến tòa soạn, mấy người bạn lại phá tan tâm trạng tốt của tôi.

Họ nói tai tôi bị bạn gái cắn. Tôi rất tức, đành giải thích là lúc cắt tóc vô tình bị kéo làm xước. Họ nửa đùa nửa thật nói: “Đi, đến tính sổ với họ. Dám làm phóng viên của chúng ta bị thương thì phải bắt tiệm đình chỉ chỉnh đốn, bồi thường thiệt hại kinh tế, trả cả tiền bồi dưỡng.” Có người còn chỉ vào tôi, cười xấu xa: “Thợ cắt tóc chắc chắn là nữ, lại rất đẹp… đúng không?”

Trong lòng tôi cũng hơi hối hận đã đến tiệm ấy, bị một nhát kéo. Nhưng nghĩ lại, ai mà chẳng có lúc sơ suất?

Chớp mắt mấy tháng trôi qua. Một hôm tôi lại đến lúc phải cắt tóc. Bạn bè giới thiệu rằng nếu cắt tóc thì đến “Mỹ Viên”, thợ ở đó vừa đẹp vừa có tay nghề rất giỏi.

Họ cứ kéo tôi đến đó. Quả nhiên tiệm “Mỹ Viên” làm ăn rất phát đạt, còn phải xếp hàng chờ. Cô gái bận rộn suốt, hiếm khi ngẩng đầu.

Đến lượt tôi, cô bỗng sững người, mặt lập tức đỏ lên, nhìn tai tôi rồi ngọt ngào hỏi: “Không sao rồi chứ?”

Tôi nói: “Không sao, cô xem, chẳng còn nhìn thấy gì nữa.”

“May nhờ anh đấy, anh ạ.”

Tôi cười: “Có gì đâu.”

Những người bạn đi cùng lúc ấy mới chợt hiểu ra: hóa ra tai cậu bị thương chính ở đây, đúng là một trải nghiệm đẹp.
`,
'b6_l22_t01': `Tôi là một công nhân bình thường. Con trai tôi, Tiểu Mẫn, vì một sự cố y tế mà cả hai tai hoàn toàn mất thính lực. Một đứa trẻ mới mười tuổi từ đó bước vào thế giới không âm thanh. Đó là cú đả kích quá lớn đối với tôi, tôi chỉ có một đứa con trai này thôi!

Việc mất thính lực khiến khả năng ngôn ngữ của con bị tổn hại nghiêm trọng. Tôi chuẩn bị đưa con đến trường dành cho trẻ câm điếc. Nhưng khi chúng tôi đến cổng trường, con bỗng khóc và nói: “Mẹ ơi, ở đây con sẽ quên cách nói. Sau này tai con khỏi mà không biết nói thì làm sao?” Lời của con khiến tôi bình tĩnh lại. Tôi nắm lấy tay con và rời khỏi đó.

Để con không mất khả năng ngôn ngữ, tôi cho con nhìn khẩu hình của mình và dạy từng câu một. Chỗ nào con không hiểu, tôi viết ra bằng bút. Dần dần tôi hiểu rằng trong đời người có thể gặp đủ loại bất hạnh. Tôi quyết tâm dùng sự nhẫn nại của một người mẹ để thắp lên ngọn lửa hy vọng trong lòng con.

Tuy nhiên, Tiểu Mẫn vẫn thi trượt vì khả năng nghe không tốt.

Tôi lấy cuốn sách nổi tiếng về Helen Keller ra và động viên con: “Con à, mắt, tai và miệng của Helen đều không hoạt động tốt, nhưng con còn khá hơn cô ấy nhiều. Helen có cô giáo Anne, con có mẹ. Mẹ chính là cô giáo của con. Con hãy tin mẹ, mẹ nhất định có thể bồi dưỡng con thành sinh viên đại học.” Nghe lời tôi, con lao vào lòng mẹ.

Khi khoa Văn của Đại học Liêu Ninh tuyển sinh hệ hàm thụ, tôi đăng ký cho Tiểu Mẫn.

Khoa bắt đầu khai giảng. Mỗi chủ nhật có học trực tiếp cả ngày. Nhưng con không nghe được giọng giảng viên, cũng không nhìn rõ khẩu hình của thầy cô. Làm sao đây? Bỗng tôi nảy ra một ý nghĩ táo bạo: tôi sẽ đi học thay con.

Từ đó, tôi cầm thẻ nghe giảng của con bước vào cổng trường đại học.

Đi học, cả đi lẫn về phải hơn hai mươi lý. Suốt nhiều năm, bất kể mùa hè hay mùa đông, bất kể gió hay mưa, tôi chưa từng bỏ một buổi. Khi nghe giảng tôi luôn ngồi hàng đầu, chăm chú nghe, nghiêm túc ghi chép. Ngay cả những câu chuyện vui thầy cô kể thêm để bổ sung bài học, tôi cũng cố ghi lại hết mức có thể để về nhà kể cho con, cố gắng đưa tư duy của con vào lớp học, giúp con hiểu nội dung giáo trình như người bình thường. Nền tảng văn hóa của tôi trước đây khá yếu, lúc mới tiếp xúc giáo trình đại học tôi thấy cực kỳ khó. Đặc biệt là Hán ngữ cổ đại, nghe đến đầu óc quay cuồng. Nhưng tôi nghĩ mình nhất định phải học được, nếu không thì dạy con thế nào?

Tôi làm việc ở nhà máy, công việc mỗi ngày rất nặng. Tan làm về nhà còn phải nấu cơm, giặt quần áo. Sau bữa tối rất muốn nghỉ một chút, xem tivi một lát. Nhưng không được! Sau tám giờ tối mỗi ngày là thời gian hai mẹ con học, không việc gì được chiếm mất. Trên bàn, trên giường trong nhà đều chất đầy các loại sách tra cứu. Ngày nào chúng tôi cũng học đến nửa đêm.

Một chủ nhật mùa đông, tuyết rơi rất lớn. Tôi bị cảm nặng, vô cùng khó chịu. Nhưng nhìn chiếc cặp sách con đã chuẩn bị sẵn cho tôi và ánh mắt đầy mong đợi của con, tôi lại gượng dậy đi đến trường. Tối tan học trở về, tôi phát hiện con đang đứng bên đường chờ. Vừa thấy tôi, con chạy tới ôm tôi xoay vòng. Trong khoảnh khắc, mọi đau đớn vì bệnh tật của tôi biến mất sạch, niềm vui ấy người khác rất khó cảm nhận.

Ngày khoa tổ chức thi, khi đưa Tiểu Mẫn vào phòng thi, tôi nắm tay con và động viên: “Con à, chúc con thành công!” Con gật đầu nói: “Mẹ yên tâm!”

Kỳ thi bắt đầu. Tôi đi đi lại lại ngoài hành lang, lòng không yên. Bỗng hiệu trưởng nhìn thấy tôi và hỏi: “Bạn học cũ, thi đã bắt đầu hai mươi phút rồi, sao cô còn chưa vào phòng thi?”

“Con trai tôi đang thi.”

Hiệu trưởng sững người: “Con trai cô ở phòng thi nào?”

“Phòng số mười bốn, số báo danh mười một.”

Ông không hỏi thêm câu nào, lập tức chạy đến phòng thi, trách giám thị: “Con trai thi thay mẹ mà các thầy cô không phát hiện sao?”

Giám thị giật mình, vội đối chiếu giấy dự thi: tuổi tác, diện mạo đều đúng. Mọi người cảm thấy kỳ lạ. Hiệu trưởng đưa tôi về văn phòng. Lúc ấy tôi mới kể tường tận đầu đuôi chuyện mấy năm qua mình đi học thay con.

Tôi vừa khóc vừa kể, hiệu trưởng cũng rơi nước mắt lắng nghe. Nghe xong, ông nói: “Cô thật sự là một người mẹ phi thường!”

Cuối cùng Tiểu Mẫn đã tốt nghiệp đại học. Sau đó con còn tự học thư pháp, hội họa, khắc triện, nghệ thuật bonsai… Nhìn con trưởng thành từng ngày, trong lòng người mẹ như tôi vui đến không nói nên lời. Tất nhiên, đối với cả cuộc đời con, đây mới chỉ là khởi đầu. Con đường phía trước còn rất dài. Nhưng dù thế nào, tôi cũng sẽ động viên con tiếp tục bước đi, tôi muốn nhìn con trở thành một người có ích cho đất nước và xã hội. Như vậy, cho dù một ngày tôi nhắm mắt, trong lòng cũng không có gì hổ thẹn.`
};

const books = [5,6];
let changed = 0;
let units = 0;
for (const book of books) {
  const dir = path.resolve(`public/data-v2/book${book}`);
  for (const name of fs.readdirSync(dir).filter(x => /^lesson\d+\.json$/.test(x))) {
    const file = path.join(dir, name);
    const d = JSON.parse(fs.readFileSync(file, 'utf8'));
    let lessonTouched = false;
    for (const t of d.texts ?? []) {
      if (vi[t.id]) {
        t.vietnamese = vi[t.id];
        t.vietnameseStatus = 'assistant_translation';
        units++;
        lessonTouched = true;
      }
    }
    if (lessonTouched) {
      d.verification ??= {};
      d.verification.translationCoverageComplete = true;
      d.verification.translationSourceVerified = false;
      d.verification.translationMethod = 'assistant_translation';
      d.verification.generatedTranslation = true;
      fs.writeFileSync(file, JSON.stringify(d, null, 2) + '\n');
      changed++;
    }
  }
}
console.log(`updated lessons=${changed}, translated text sections=${units}`);
if (units !== 25) {
  console.error(`expected 25 translated text sections, got ${units}`);
  process.exit(1);
}
